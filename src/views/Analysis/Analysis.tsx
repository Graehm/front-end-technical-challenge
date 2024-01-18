import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAnalysis } from '../../api/getAnalysis';
import { ResponsiveBar } from '@nivo/bar';

interface ModelData {
  country: string;
  model_type: string;
  num_continuous: number;
}

const Analysis = () => {
  const { MODEL_NAME } = useParams<{ MODEL_NAME?: string }>() ?? {};
  const [analysisData, setAnalysisData] = useState<{ origin: string; value: number; insight_name: string; name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnalysis(MODEL_NAME);
        setAnalysisData(data.map((item: ModelData) => ({
          origin: item.country,
          value: item.num_continuous,
          insight_name: 'num_continuous',
          name: 'num_continuous',
        })));
      } catch (error) {
        console.error('Error fetching analysis data:', error);
      }
    };

    fetchData();
  }, [MODEL_NAME]);

  return (
    <div>
      <h1>{MODEL_NAME}</h1>
      <div className="chart-card">
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