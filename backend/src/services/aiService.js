const axios = require("axios");
const buildTriagePrompt = require("../prompts/triagePrompt");

const analyzeReportWithAI = async (reportText) => {
  try {
    const prompt = buildTriagePrompt(reportText);

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleanedText = text.replace(/```json|```/g, "").trim();

    const firstBrace = cleanedText.indexOf("{");
    const lastBrace = cleanedText.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("Invalid JSON returned from AI");
    }

    const jsonText = cleanedText.slice(firstBrace, lastBrace + 1);
    return JSON.parse(jsonText);
  } catch (error) {
    console.error(
      "AI Service Error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to analyze report with AI");
  }
};

module.exports = {
  analyzeReportWithAI
};