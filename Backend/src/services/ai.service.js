import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const generateTitleAndCategory = async ({ notes }) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: notes,
    config: {
      systemInstruction: ` You are a text analyzer that outputs only structured JSON.

Task:
Given a note as input, analyze its content and generate:
1. A concise title (max 5 words)
2. A category that fits it best

Output format:
{
  "title": "Generated Title",
  "category": "CategoryName"
}

Rules:
- Do not include any explanation or extra text.
- Do not use Markdown or code blocks.
- Output only valid JSON.
 `,
    },
  });
  const result = response.text
    .replace(/```json/i, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(result);
};

export const summarizeNote = async ({ notes }) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: notes,
    config: {
      systemInstruction: ` You are a text summarizer.

Task:
Analyze the given note and generate a summary that:
1. Is written in simple, easy-to-read language.
2. Explains the main points clearly and concisely.
3. Uses Markdown formatting for readability (e.g., headings, bullet points, bold text).

Output format:
- Start with a short **summary heading** (## Summary)
- Follow with 3–6 bullet points summarizing key ideas.
- Do not include any extra text, explanations, or introductory phrases outside the summary.

Rules:
- Do not say anything like “Here is your summary” or “Okay, I will summarize”.
- Do not use code blocks.
- Output only the final Markdown summary.

        `,
    },
  });
  return response.text
    .replace(/```markdown/i, "")
    .replace(/```/g, "")
    .trim();
};
