import { Routes } from "react-router-dom";
import renderRoutes from "./routes";

function App() {
  return <Routes>{renderRoutes()}</Routes>;
}

export default App;
