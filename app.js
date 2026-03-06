import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const history = [];
const sampleChats = readlineSync.question(
  "Please share some sample chats with your ex girlfriend (in this format: 'Name: Message') (don't be afraid because your personal information will not be saved or shared) --> ",
);

async function main(userInput) {
  history.push({
    role: "user",
    part: [{ text: userInput }],
  });

  const chats = sampleChats;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: userInput,
    history: history,
    config: {
      systemInstruction: `you work is to do chats with me like my ex girlfriend, mai abhi samples chats de raha hu tum uske hisab se baat karna, uska nature behaviour, baat krne ka style samjhke user ke response dena similar to my ex girlfriend, yaha pe sample chats hai --> {
        ${chats}
      } 
        
      bhai jasa sample chats hai waise hi behave krna meri ex girlfriend jaisa. acha response do similar to my girlfriend`,
    },
  });
  // console.log(response.text);
  return response.text;
}

async function loop() {
  const userInput = readlineSync.question("Enter your message --> ");
  const response = await main(userInput);
  history.push({
    role: "model",
    part: [{ text: response }],
  });
  console.log("gf --> ", response);
  loop();
}


// loop();
