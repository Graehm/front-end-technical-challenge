import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAnalysis } from '../../api/getAnalysis';
import { ResponsiveBar } from '@nivo/bar';

const AnalysisPage = () => {
  const { MODEL_NAME } = useParams();
  const [analysisData, setAnalysisData] = useState<Array<Array<{
    origin: string;
    value: string[] | { [key: string]: number };
    insight_name: string;
    name: string;
  }>>>([]);
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

export default AnalysisPage;