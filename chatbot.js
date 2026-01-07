import { GoogleGenAI } from "@google/genai";
import CONFIG from "./config.js"; // Import your configuration

// **SECURITY WARNING: Replace this with reading from a secure environment variable!**
// For example: process.env.GEMINI_API_KEY
const apiKey = CONFIG.GEMINI_API_KEY; 
const ai = new GoogleGenAI(apiKey);

// --- Core Function to Handle Chat ---
async function getChatBotResponse(history, newMessage) {
  try {
    // 1. Create a new chat session using the configuration
    const chat = ai.chats.create({
      model: CONFIG.GEMINI_MODEL,
      config: {
        // The SDK properly handles the system prompt here
        systemInstruction: CONFIG.SYSTEM_PROMPT,
        temperature: CONFIG.TEMPERATURE,
        maxOutputTokens: CONFIG.MAX_TOKENS,
      },
      // 2. Pass the previous conversation history
      history: history 
    });

    console.log(`Sending message to ${CONFIG.GEMINI_MODEL}: ${newMessage}`);

    // 3. Send the new user message to the chat
    const response = await chat.sendMessage({
      message: newMessage 
    });

    // 4. Retrieve the updated history (including the latest user and model message)
    const newHistory = await chat.getHistory();

    // 5. Return the model's text response and the full new history
    return {
      text: response.text,
      newHistory: newHistory,
    };

  } catch (error) {
    console.error("GEMINI API Error:", error);
    // Return a structured error response
    return {
      text: "Sorry, I am experiencing a technical issue right now. Please try again later.",
      newHistory: history // Send back the old history so the client doesn't break
    };
  }
}

// --- Example Usage (How you would test this on the server) ---
async function testChat() {
  let conversationHistory = [];
  let response;

  // First turn
  response = await getChatBotResponse(conversationHistory, "What are the common side effects of ibuprofen?");
  console.log("\nAI Response 1:", response.text);
  conversationHistory = response.newHistory;
  
  // Second turn (relies on history from the first)
  response = await getChatBotResponse(conversationHistory, "How often can I take it?");
  console.log("\nAI Response 2:", response.text);
  conversationHistory = response.newHistory;
}

// Uncomment the line below to test the chat history logic on your server
// testChat();

// In a real application, you'd export this function to be called by an HTTP endpoint
// export { getChatBotResponse };