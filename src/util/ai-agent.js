import { GoogleGenerativeAI } from "@google/generative-ai";
import {properties} from "../config/properties.js"
import {systemPrompt} from "../prompt/systemPrompt.js"


const GEMINI_API_KEY = properties?.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateCircuit(userPrompt) {
  try {
    const result = await model.generateContent([systemPrompt, userPrompt]);
    return result.response.text()
  } catch (error) {
    throw error
  }
}

export default generateCircuit;