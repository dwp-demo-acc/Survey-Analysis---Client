// import { AzOpenAIClient } from '../services/AzOpenAIClient'; 

// interface Message {
//     role: "system" | "user";
//     content: string;
// }

// class ChatModel {
//     private client: AzOpenAIClient | any;
//     private _defaultConfig: { model: string };

//     constructor(type: "sync" | "async" = "sync") {
//         this.client = new AzOpenAIClient();
//             this.client.connect();

//         this._defaultConfig = {
//             model: "ddai_gpt4_32k",
//         };
//     }

//     createPrompt(systemContent = "", userContent = ""): Message[] {
//         const systemMessage = systemContent ? { role: "system", content: systemContent } : null;
//         const userMessage: Message = { role: "user", content: userContent };
//         return [systemMessage, userMessage].filter((message): message is Message => message !== null);
//     }

//     async callModel(prompt: string | Message[], config: Record<string, any> = {}): Promise<string | null> {
//         try {
//             const mergedConfig = { ...this._defaultConfig, ...config };

//             if (typeof prompt === "string") {
//                 prompt = this.createPrompt(undefined, prompt);
//             }

//             const response = await this.client.chat.completions.create({
//                 ...mergedConfig,
//                 messages: prompt
//             });

//             return response.choices[0].message.content;
//         } catch (error) {
//             console.error(`An error occurred: ${error}`);
//             return null;
//         }
//     }

//     toString(): string {
//         const model = this._defaultConfig.model;
//         return `OpenAI Chat Model : ${model}`;
//     }
// }

// export { ChatModel };