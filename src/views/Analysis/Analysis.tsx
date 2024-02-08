import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAnalysis } from '../../api/getAnalysis';
import { ResponsiveBar } from '@nivo/bar';


interface AnalysisData {
  origin: string
  value: number
  insight_name: string
  name: string
}
const Analysis = () => {
  // const { modelName }: { modelName?: string } = useParams() ----->"possible solution to modelName expected arguments"
  const { modelName } = useParams<{ modelName?: string }>() ?? {};
  const [analysisData, setAnalysisData] = useState<AnalysisData[]>([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      console.log('fetching from modelName', modelName)
      if (modelName) {
        const data = await getAnalysis(modelName)
        console.log('fetched data from getAnalysis data', data)
        setAnalysisData(data)
      }
    } catch (error) {
      console.log('Error fetching specific model car inside useEffect at Analysis.tsx', error)
    }
  }

  fetchData()
}, [modelName])


  // add styling to barchart so it renders not only responsive but to scale 
  // find the vlaue to display the barchart in (percentage or something) -- reference NIVO data for their defining key value pair
  return (
    <div>
      <div className="flex items-center mb-4">
        <Link to="/src/components/ModelList.tsx" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-600">
          Back to Model List
        </Link>
        <h1 className="ml-4">{modelName}</h1>
      </div>
      <div className="chart-card h-96">
        <ResponsiveBar
          data={analysisData}
          keys={['value']}
          indexBy="origin"
          layout="horizontal"
          axisBottom={{
            format: (value) => `${value}%`,
          }}
          enableGridX={false}
        />
      </div>
    </div>
  );
};

export default Analysis;



// interface ModelData {
//   country: string
//   model_type: string
//   num_continuous: number
// }


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       //modelName string: undefined but only here 
  //       const data = await getAnalysis(modelName);
  //       setAnalysisData(data.map((item: ModelData) => ({
  //         origin: item.country,
  //         value: item.num_continuous,
  //         insight_name: 'num_continuous',
  //         name: 'num_continuous',
  //       })));
  //     } catch (error) {
  //       console.error('Error fetching analysis data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [modelName]);