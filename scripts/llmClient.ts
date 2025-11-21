import OpenAI from 'openai';

// Ensure API key is present
if (!process.env.OPENAI_API_KEY) {
    console.warn("Warning: OPENAI_API_KEY is not set in environment variables.");
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function callLLM(systemPrompt: string, userPrompt: string): Promise<string | null> {
    try {
        const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
            { role: 'system', content: systemPrompt } as OpenAI.Chat.ChatCompletionSystemMessageParam,
            { role: 'user', content: userPrompt } as OpenAI.Chat.ChatCompletionUserMessageParam,
        ];

        const completion = await openai.chat.completions.create({
            messages,
            model: 'gpt-4o',
            response_format: { type: "json_object" },
            temperature: 0.7,
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error calling LLM:', error);
        return null;
    }
}
