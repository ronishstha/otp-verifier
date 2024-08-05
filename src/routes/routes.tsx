import { createBrowserRouter } from "react-router-dom";
import VerificationCode from "../pages/VerificationCode";
import Success from "../pages/Success";

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
