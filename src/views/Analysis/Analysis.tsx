import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAnalysis } from '../../api/getAnalysis';
import { ResponsiveBar } from '@nivo/bar';

interface AnalysisDataItem {
  origin: string;
  value: string[] | Record<string, number>;
  insight_name: string;
  name: string;
}

const Analysis = () => {
  const { MODEL_NAME } = useParams<{ MODEL_NAME: string }>() ?? { MODEL_NAME: '' };
  const [analysisData, setAnalysisData] = useState<AnalysisDataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAnalysis(MODEL_NAME);
        setAnalysisData(data);
      } catch (error) {
        console.error('404 error fetching analysis data:', error);
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