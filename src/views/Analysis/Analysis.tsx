import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAnalysis } from '../../api/getAnalysis';
import { ResponsiveBar } from '@nivo/bar';

// interface ModelData {
//   country: string
//   model_type: string
//   num_continuous: number
// }

interface AnalysisData {
  origin: string
  value: number
  insight_name: string
  name: string
}
const Analysis = () => {
  const { modelName } = useParams<{ modelName?: string }>() ?? {};
  const [analysisData, setAnalysisData] = useState<AnalysisData[]>([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      console.log('fetching from modelName', modelName)
      if (modelName) {
        const data = await getAnalysis(modelName)
        setAnalysisData(data)
      }
    } catch (error) {
      console.log('Error fetching specific model car inside useEffect at Analysis.tsx', error)
    }
  }

  fetchData()
}, [modelName])


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

  return (
    <div>
      <h1>{modelName}</h1>
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