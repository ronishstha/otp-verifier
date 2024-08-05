import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/config";
import OTPInput from "../components/OTPInput";
import Button from "../components/Button";
import Error from "../components/Error";

const INPUT_SIZE = 6;

const VerificationCode = () => {
  const navigate = useNavigate();
  const [invalidInputs, setInvalidInputs] = useState<boolean[]>(
    new Array(INPUT_SIZE).fill(false)
  );
  const [error, setError] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const newInvalidInputs = [];

    for (let i = 0; i < INPUT_SIZE; i++) {
      newInvalidInputs[i] = !code[i] || isNaN(Number(code[i])) ? true : false;
    }
    setInvalidInputs(newInvalidInputs);

    try {
      const response = await axios.post(`${config.SERVER_URL}/verify`, {
        code,
      });
      if (response?.data?.success) {
        navigate("success", { state: { fromVerification: true } });
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
      console.error("An error occured: ", e);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <p className="font-bold text-lg">Verification Code</p>
      </div>
      <OTPInput
        code={code}
        invalidInputs={invalidInputs}
        setCode={setCode}
        setInvalidInputs={setInvalidInputs}
        inputSize={INPUT_SIZE}
      />
      <Button onSubmit={handleSubmit} label="Submit" loading={loading} />
      {error && <Error />}
    </>
  );
};

export default VerificationCode;
