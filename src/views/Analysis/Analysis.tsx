import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAnalysis } from '../../api/getAnalysis';
import { ResponsiveBar } from '@nivo/bar';

const Analysis = () => {
  const { MODEL_NAME } = useParams<{ MODEL_NAME: string }>() ?? { MODEL_NAME: '' };
  const [analysisData, setAnalysisData] = useState<Array<Array<any>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, loading } = await getAnalysis(MODEL_NAME);
        setAnalysisData(data);
        setLoading(loading);
      } catch (error) {
        console.error('Error fetching analysis data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [MODEL_NAME]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{MODEL_NAME}</h1>
      <div className="chart-card">
        <ResponsiveBar
          data={analysisData}
          keys={['percentage']}
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