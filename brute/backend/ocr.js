import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyClk89euI3b5A2foaV2fBq5tM723u4su8I");

export async function summarizeChat(text) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Summarize the following text clearly and concisely:

${text}
`;

  const result = await model.generateContent(prompt);
  console.log("summary :",result.response.text())
  return result.response.text();
}
