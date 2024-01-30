import { modelsResponse, analysisResponse } from "./mockedData";
import { delay } from "./utils";

interface TransformedDataItem {
  origin: string;
  value: number;
  insight_name: string;
  name: string;
}

export const getAnalysis = async (modelName: string | undefined) => {
  await delay(1000);

  if (!modelName) {
    return []; // Return empty array if modelName is undefined
  }

  const model = modelsResponse.find((model) => model.model_name === modelName);

  if (!model) {
    return []; // Return empty array if no matching model found
  }

  const data: TransformedDataItem[] = [
    {
      origin: model.model_name,
      value: model.num_continuous, // Adjust this based on your data structure
      insight_name: "insight_name_placeholder", // Replace with actual insight_name
      name: "name_placeholder", // Replace with actual name
    },
  ];

  return data;
};

// --------- FILE FOR ANALYSIS.TSX WHEN PASSING MODELNAME AND NOTTTT GETANALYSIS------ //
// import { modelsResponse } from "./mockedData";
// import { delay } from "./utils";

// interface TransformedDataItem {
//   country: string;
//   model_type: string;
//   num_continuous: number;
// }

// export const getAnalysis = async () => {
//   await delay(1000);

//   const data: TransformedDataItem[] = modelsResponse.map((model) => ({
//     country: model.model_name,
//     model_type: model.model_type,
//     num_continuous: model.num_continuous,
//   }));

//   return data;
// };






// ---------- OG FILE ------------ //
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
