import { useParams } from 'react-router-dom';
import { getAnalysis } from '../../api/getAnalysis';
import { ResponsiveBar } from '@nivo/bar';

const AnalysisPage = () => {
  const { MODEL_NAME } = useParams();
  const { data, loading } = getAnalysis(MODEL_NAME);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{MODEL_NAME}</h1>
      <div className="chart-card">
        <ResponsiveBar
          data={data}
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