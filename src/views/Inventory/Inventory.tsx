import ModelList from "../../components/ModelList";

const Inventory = () => {
  return (
    <div>
      <h1>Hello Inventory :)</h1>
      
      <ModelList /> {/* Ensure that the component name is ModelList, not Modelist */}
    </div>
  );
};

export default Inventory;