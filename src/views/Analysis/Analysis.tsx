import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAnalysis } from '../../api/getAnalysis';
import { ResponsiveBar } from '@nivo/bar';

const Analysis: React.FC = () => {
  const { modelName } = useParams<{ modelName: string }>();
  const [analysisData, setAnalysisData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch analysis data when the component mounts
    const fetchAnalysisData = async () => {
      try {
        const { data, loading } = await getAnalysis(modelName);
        setAnalysisData(transformAnalysisData(data));
        setLoading(loading);
      } catch (error) {
        console.error('Error fetching analysis data:', error);
        setLoading(false);
      }
    };
    fetchAnalysisData();
  }, [modelName]); // Refetch when modelName changes

  const transformAnalysisData = (data: any[]) => {
    if (!data || !data[0]) return []; // Handle null or empty data
    const transformedData = data[0].map((entry: any) => {
      if (entry.origin !== 'dd') {
        return {
          country: entry.name.replace('_variable_ranking', ''), // Adjust as per your data structure
          ...entry.value,
        };
      }
      return null; // Exclude entries with origin 'dd'
    });
    return transformedData.filter((entry: any) => entry !== null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Analysis for {modelName}</h1>
      <div style={{ height: '400px', width: '100%' }}>
        <ResponsiveBar
          data={analysisData}
          keys={['PetalWidthCm', 'SepalWidthCm', 'PetalLengthCm', 'SepalLengthCm']}
          indexBy="country"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true,
            },
          ]}
          fill={[
            {
              match: {
                id: 'fries',
              },
              id: 'dots',
            },
          ]}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
        />
      </div>
      <button onClick={() => navigate(-1)}>Go Back</button>
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