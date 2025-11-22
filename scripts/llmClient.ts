import OpenAI from 'openai';

// --- Types & Errors ---

export type LLMParams = {
    system: string;
    user: string;
    jsonInput?: any; // Object to be stringified and appended to user prompt
    temperature?: number;
};

export class CloudLLMError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CloudLLMError";
    }
}

export class LocalLLMError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "LocalLLMError";
    }
}

export class HybridLLMError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "HybridLLMError";
    }
}

// --- Configuration ---

const CLOUD_MODEL = process.env.PETMATCHR_LLM_MODEL ?? "gpt-4o-mini";
const LOCAL_LLM_URL = process.env.PETMATCHR_LOCAL_LLM_URL; // e.g. http://localhost:11434/api/chat
const LOCAL_LLM_MODEL = process.env.PETMATCHR_LOCAL_LLM_MODEL ?? "llama3";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// --- Helper to format prompt ---

function formatUserPrompt(user: string, jsonInput?: any): string {
    if (!jsonInput) return user;
    return `${user}\n\nINPUT_JSON:\n${JSON.stringify(jsonInput, null, 2)}`;
}

// --- Cloud LLM ---

export async function callCloudLLM(params: LLMParams): Promise<any> {
    if (!process.env.OPENAI_API_KEY) {
        throw new CloudLLMError("OPENAI_API_KEY is not set.");
    }

    try {
        const content = formatUserPrompt(params.user, params.jsonInput);

        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: params.system },
                { role: 'user', content: content },
            ],
            model: CLOUD_MODEL,
            response_format: { type: "json_object" },
            temperature: params.temperature ?? 0.7,
        });

        const result = completion.choices[0].message.content;
        if (!result) throw new CloudLLMError("Empty response from Cloud LLM");

        return JSON.parse(result);
    } catch (error: any) {
        console.error("Cloud LLM Error:", error.message);
        throw new CloudLLMError(error.message || "Unknown Cloud LLM Error");
    }
}

// --- Local LLM ---

export async function callLocalLLM(params: LLMParams): Promise<any> {
    if (!LOCAL_LLM_URL) {
        throw new LocalLLMError("PETMATCHR_LOCAL_LLM_URL is not set.");
    }

    try {
        const content = formatUserPrompt(params.user, params.jsonInput);

        // Adapt this payload to your specific local LLM server API (e.g., Ollama, vLLM)
        // This example assumes an Ollama-compatible or OpenAI-compatible local endpoint
        const payload = {
            model: LOCAL_LLM_MODEL,
            messages: [
                { role: 'system', content: params.system },
                { role: 'user', content: content },
            ],
            format: "json", // Ollama specific, adjust if needed
            stream: false,
            options: {
                temperature: params.temperature ?? 0.7,
            }
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

        const response = await fetch(LOCAL_LLM_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new LocalLLMError(`Local LLM responded with ${response.status}`);
        }

        const data = await response.json() as any;
        // Adjust parsing based on your local LLM response structure
        // Ollama returns { message: { content: "..." } }
        // OpenAI-compatible returns { choices: [ { message: { content: "..." } } ] }

        let resultString = "";
        if (data.message?.content) {
            resultString = data.message.content;
        } else if (data.choices?.[0]?.message?.content) {
            resultString = data.choices[0].message.content;
        } else {
            // Fallback: try to stringify data if it looks like the direct JSON
            resultString = JSON.stringify(data);
        }

        return JSON.parse(resultString);

    } catch (error: any) {
        console.error("Local LLM Error:", error.message);
        throw new LocalLLMError(error.message || "Unknown Local LLM Error");
    }
}

// --- Hybrid LLM ---

export async function callHybridLLM(params: LLMParams): Promise<any> {
    const MAX_RETRIES = 2;
    let lastError: any;

    // 1. Try Cloud first (with retries)
    for (let i = 0; i <= MAX_RETRIES; i++) {
        try {
            return await callCloudLLM(params);
        } catch (cloudError: any) {
            console.warn(`Cloud LLM attempt ${i + 1} failed:`, cloudError.message);
            lastError = cloudError;
            if (i < MAX_RETRIES) {
                await new Promise(r => setTimeout(r, 1000 * (i + 1))); // Exponential backoff
            }
        }
    }

    console.warn("All Cloud LLM attempts failed. Failing over to Local LLM...");

    // 2. Try Local (with retries)
    for (let i = 0; i <= MAX_RETRIES; i++) {
        try {
            return await callLocalLLM(params);
        } catch (localError: any) {
            console.warn(`Local LLM attempt ${i + 1} failed:`, localError.message);
            lastError = localError;
            if (i < MAX_RETRIES) {
                await new Promise(r => setTimeout(r, 1000 * (i + 1)));
            }
        }
    }

    console.error("Both Cloud and Local LLMs failed after retries.");
    throw new HybridLLMError(`Hybrid LLM failed: ${lastError?.message || "Unknown error"}`);
}

// Backward compatibility wrapper if needed, but prefer using callHybridLLM directly
export async function callLLM(system: string, user: string, jsonInput?: any): Promise<any> {
    return callHybridLLM({ system, user, jsonInput });
}
