import { GoogleGenerativeAI } from "@google/generative-ai";
import { getChatHistory, newMessage } from "../firebaseSetUp"; 
import { GEMINI_API_KEY } from "../src/secrets";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function runChat(chatId, userInput, onStream) {
  try {
    const rawHistory = await getChatHistory(chatId); 

    const formattedHistory = (rawHistory || []).flatMap(msg => [
      { role: "user", parts: [{ text: msg.user }] },
      { role: "model", parts: [{ text: msg.bot }] }
    ]);

    // 1. ADD SYSTEM INSTRUCTION HERE
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", // Updated to a valid model version
      systemInstruction: "You are a specialized legal AI assistant. You must ONLY answer questions related to law, court proceedings, judiciary, and legal matters. If a user asks anything outside of these topics, politely inform them that you are restricted to providing legal-related information only."
    });

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.5, // Lower temperature for more factual legal responses
      },
    });

    const result = await chat.sendMessageStream(userInput);
    let fullResponse = "";

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullResponse += chunkText;
      if (onStream) onStream(chunkText); 
    }

    const newId = await newMessage(chatId, fullResponse, userInput);
    
    return { fullResponse, newId };

  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
}



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