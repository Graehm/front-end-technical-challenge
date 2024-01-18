import { analysisResponse } from "./mockedData";
import { delay } from "./utils";

interface AnalysisDataItem {
  origin: string;
  value: string[] | Record<string, number>;
  insight_name: string;
  name: string;
}

export const getAnalysis = async (modelName: string) => {
  await delay(1000);

  const data: AnalysisDataItem[] = analysisResponse[0].map(item => ({
    origin: item.origin,
    value: item.value,
    insight_name: item.insight_name,
    name: item.name,
  }));

  const loading = false;

  return { data, loading };
};


// import { analysisResponse, modelsResponse } from "./mockedData";
// import { delay } from "./utils";

// const modelNames = modelsResponse.map((model) => model.model_name);

// export const getAnalysis = async (modelName: string) => {
//   let loading = true;
//   let data = [];

//   await delay(1000);

//   console.log(modelNames, modelName, modelNames.includes(modelName));
//   if (!modelNames.includes(modelName)) {
//     data = [null];
//     loading = false;

//     return { data, loading };
//   }

//   data = analysisResponse;
//   loading = false;

//   return { data, loading };
// };
