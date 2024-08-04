import { createBrowserRouter } from "react-router-dom";
import VerificationCode from "./VerificationCode";
import Success from "./Success";

const router = createBrowserRouter([
  {
    path: "/",
    element: <VerificationCode />,
  },
  {
    path: "success",
    element: <Success />,
  },
]);

export default router;
