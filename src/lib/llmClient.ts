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

// --- Configuration ---

const CLOUD_MODEL = process.env.PETMATCHR_LLM_MODEL ?? "gpt-4o-mini";
const LOCAL_LLM_URL = process.env.PETMATCHR_LOCAL_LLM_URL; // e.g. http://localhost:11434/api/chat
const LOCAL_LLM_MODEL = process.env.PETMATCHR_LOCAL_LLM_MODEL ?? "llama3";

let openaiInstance: OpenAI | null = null;

function getOpenAI() {
    if (!openaiInstance) {
        openaiInstance = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openaiInstance;
}

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
        const openai = getOpenAI();
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
    // 1. Try Cloud
    try {
        return await callCloudLLM(params);
    } catch (cloudError) {
        console.warn("Cloud LLM failed, failing over to Local LLM...", cloudError);

        // 2. Try Local
        try {
            return await callLocalLLM(params);
        } catch (localError) {
            console.error("Local LLM also failed.", localError);
            throw new HybridLLMError("Both Cloud and Local LLMs failed.");
        }
    }
}

// Backward compatibility wrapper if needed, but prefer using callHybridLLM directly
export async function callLLM(system: string, user: string, jsonInput?: any): Promise<any> {
    return callHybridLLM({ system, user, jsonInput });
}
