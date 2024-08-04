import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Routes";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
