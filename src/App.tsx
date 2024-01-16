import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
// import ModelList from "./components/ModelList"; // dont import b/c it is importing to the home page

function App() {
  return (
    <div className="flex flex-col gap-2">
      <Navbar />
      {/* <ModelList /> */}
      <Outlet /> 
      {/* acts as an placeholder for child router elements like Home and Inventory and where they will be rendered */}
    </div>
  );
}

export default App;
