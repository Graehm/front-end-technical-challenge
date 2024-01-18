import { analysisResponse } from "./mockedData";
import { delay } from "./utils";

export const getAnalysis = async (modelName: string) => {
  let loading = true;
  let data = [];

  await delay(1000);

  if (!analysisResponse[0].some((item) => item.origin === modelName)) {
    data = [null];
    loading = false;

    return { data, loading };
  }

  data = analysisResponse[0]
    .filter((item) => typeof item.value !== 'object')
    .map((item) => ({
      origin: item.origin,
      value: item.value as string[], 
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
