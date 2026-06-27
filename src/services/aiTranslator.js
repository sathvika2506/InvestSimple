// src/services/aiTranslator.js
const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const getHumanReadableInsight = async (marketData, assetName) => {
  const prompt = `
    You are a financial advisor. Analyze this data: ${JSON.stringify(marketData)}.
    Return ONLY a valid JSON object with these keys: 
    {
      "technical_data": {"price": number, "change": number},
      "human_translation": "string",
      "goal_alignment": "string",
      "confidence_score": number
    }
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" } // Forces AI to return JSON
    });
    
    return JSON.parse(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("AI Translation Error:", error);
    return {
      technical_data: marketData,
      human_translation: "Market is active. Stay consistent with your goals!",
      goal_alignment: "No data available",
      confidence_score: 0
    };
  }
};

module.exports = { getHumanReadableInsight };