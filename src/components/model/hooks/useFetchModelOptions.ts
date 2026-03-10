type ModelReasoning = string;
type ModelType = string;

interface Model {
    type: ModelType;
    reasoning: ModelReasoning[];
}

interface UseFetchModelOptions {
    models: Model[];
    defaultModel: ModelType;
    defaultReasoning: ModelReasoning;
}

export const DEFAULT_REASONINGS = ["medium"];

const useFetchModelOptions = (): UseFetchModelOptions => {
  return {
    models: [
      {
        type: "gpt-5",
        reasoning: ["medium", "high"],
      },
      {
        type: "gemini",
        reasoning: ["medium", "high"],
      },
    ],
    defaultModel: "gpt-5",
    defaultReasoning: "medium",
  };
};

export default useFetchModelOptions;
