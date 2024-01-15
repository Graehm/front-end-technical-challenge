import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Typography } from "@mui/joy";
import { getModels } from "../api/getModels";

interface Model {
  model_name: string; 
  model_type: string;
}

const ModelList = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, loading } = await getModels();
      if (!loading) {
        setModels(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {models.map((model) => (
        <Link to={`/analysis/${model.model_name}`} key={model.pk}>
          <Card
            sx={{
              border: "1px solid transparent",
              transition: "border-color 0.3s",
              "&:hover": {
                borderColor: "blue",
              },
            }}
          >
            <div className="flex justify-between">
              <Typography level="body-md">{model.model_name}</Typography>
              <Typography level="body-md">
                {model.model_type === "Classification"
                  ? "Classification"
                  : "Regression"}
              </Typography>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ModelList;
