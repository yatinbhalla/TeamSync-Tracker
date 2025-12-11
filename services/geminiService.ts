import { GoogleGenAI, Type } from "@google/genai";
import { AI_MODEL_FLASH } from "../constants";
import { Project, ProjectStatus } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSampleProjects = async (): Promise<Omit<Project, 'id' | 'createdAt'>[]> => {
  try {
    const response = await ai.models.generateContent({
      model: AI_MODEL_FLASH,
      contents: "Generate 5 realistic software development team project ideas with owners (full names), statuses, and brief descriptions (1-2 sentences).",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Project title" },
              owner: { type: Type.STRING, description: "Full name of the project owner" },
              status: { 
                type: Type.STRING, 
                enum: [ProjectStatus.NOT_STARTED, ProjectStatus.IN_PROCESS, ProjectStatus.DONE] 
              },
              description: { type: Type.STRING, description: "A brief 1-2 sentence description of the project" }
            },
            required: ["name", "owner", "status", "description"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Failed to generate projects:", error);
    return [];
  }
};
