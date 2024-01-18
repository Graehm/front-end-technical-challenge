import { modelsResponse } from "./mockedData";
import { delay } from "./utils";

interface TransformedDataItem {
  country: string;
  model_type: string;
  num_continuous: number;
}

export const getAnalysis = async (modelName: string) => {
  await delay(1000);

  const data: TransformedDataItem[] = modelsResponse.map((model) => ({
    country: model.model_name,
    model_type: model.model_type,
    num_continuous: model.num_continuous,
  }));

  return data;
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
