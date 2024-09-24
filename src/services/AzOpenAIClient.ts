// import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
// import dotenv from "dotenv";

// dotenv.config();

// class AzOpenAIClient {
//   private _api_key: string;
//   private _api_version: string;
//   private _api_base: string;

//   constructor() {
//     this._api_key = process.env.OPENAI_API_KEY!;
//     this._api_version = ApiVersion; 
//     this._api_base = apiBase; 
//   }

//   connect(): OpenAIClient {
//     return new OpenAIClient(new AzureKeyCredential(this._api_key), { endpoint: this._api_base });
//   }
// }

// export { AzOpenAIClient };