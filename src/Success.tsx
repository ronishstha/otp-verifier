import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state?.fromVerification) {
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] h-screen flex flex-col mt-28 items-center gap-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-16 text-green-700"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
          />
        </svg>
        <p className="font-bold text-lg">Verification Successful!</p>
      </div>
    </div>
  );
};

export default Success;
