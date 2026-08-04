import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export function getAgentModel() {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not defined in .env or the environment.");
  }

  const provider = createOpenRouter({ apiKey });
  const modelId = process.env.OPENROUTER_DEFAULT_MODEL?.trim();

  if (!modelId) {
    throw new Error("OPENROUTER_DEFAULT_MODEL is not defined in .env or the environment.");
  }

  return provider(modelId);
}
