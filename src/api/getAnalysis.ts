import { analysisResponse } from "./mockedData";
import { delay } from "./utils";

interface AnalysisDataItem {
  origin: string;
  value: string[] | Record<string, number>;
  insight_name: string;
  name: string;
}

export const getAnalysis = async (modelName: string) => {
  let loading = true;
  let data: AnalysisDataItem[] = [];

  await delay(1000);

  if (!analysisResponse[0].some(item => item.origin === modelName)) {
    data = [null!]; // You might want to handle this case differently
    loading = false;

    return { data, loading };
  }

  data = analysisResponse[0]
    .filter((item) => item.origin === modelName)
    .map((item) => ({
      origin: item.origin,
      value: item.value,
      insight_name: item.insight_name,
      name: item.name,
    }));

  loading = false;

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
