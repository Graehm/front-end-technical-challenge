import { analysisResponse } from "./mockedData";
import { delay } from "./utils";

export const getAnalysis = async (modelName: string) => {
  let loading = true;
  let data = [];

  await delay(1000);

  if (!modelNames.includes(modelName)) {
    data = [null];
    loading = false;

    return { data, loading };
  }

  // Filter out objects with numeric values
  data = analysisResponse[0]
    .filter((item) => typeof item.value !== 'object')
    .map((item) => ({
      origin: item.origin,
      value: item.value as string[], // Ensure TypeScript recognizes the type
      insight_name: item.insight_name,
      name: item.name,
    }));

  loading = false;

  return { data, loading };
};