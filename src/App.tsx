import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/routes";

const App = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] h-screen flex flex-col mt-28 items-center gap-10">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
