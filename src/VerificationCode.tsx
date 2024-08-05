import axios from "axios";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const INPUT_SIZE = 6;

const VerificationCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [invalidInputs, setInvalidInputs] = useState<boolean[]>(
    new Array(INPUT_SIZE).fill(false)
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, INPUT_SIZE);
  }, []);

  const handleInput = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (value.length < 2 && code[index] !== element.value) {
      setCode((currentCode) => {
        const splitCode = currentCode.split("");
        if (value.length > 1) {
          splitCode[index] = value[0];
        } else {
          splitCode[index] = value;
        }
        const joinedCode = splitCode.join("");

        return joinedCode;
      });

      setInvalidInputs((prev) => {
        const newInvalidInputs = [...prev];
        newInvalidInputs[index] = value === "" || isNaN(Number(value));
        return newInvalidInputs;
      });
    }

    // Focus next input
    if (value && element.nextSibling) {
      (element.nextSibling as HTMLElement)?.focus();
    }

    // Focus previous input on value removal
    if (!value && element.previousSibling) {
      (element.previousSibling as HTMLElement).focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e?.clipboardData.getData("text").slice(0, INPUT_SIZE);
    setCode(pasteData);

    const newInvalidInputs = pasteData
      .split("")
      .map((char) => char === "" || isNaN(Number(char)));
    newInvalidInputs.length = INPUT_SIZE;
    for (let i = pasteData.length; i < INPUT_SIZE; i++) {
      newInvalidInputs[i] = true;
    }
    setInvalidInputs(newInvalidInputs);

    inputRefs.current.forEach((input, index) => {
      if (input) {
        input.value = pasteData[index] || "";
      }
    });

    if (pasteData.length < INPUT_SIZE) {
      inputRefs?.current[pasteData.length]?.focus();
    } else {
      inputRefs?.current[5]?.focus();
    }
  };

  // focus left or right input based on arrow keys
  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "ArrowLeft" && index > 0) {
      focusAndSelect(inputRefs.current[index - 1]);
    } else if (event.key === "ArrowRight" && index < 5) {
      focusAndSelect(inputRefs.current[index + 1]);
    }
  };

  // select the text inside input when an input is clicked
  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.currentTarget;
    focusAndSelect(input);
  };

  // to select text when an input is focused
  const focusAndSelect = (element: HTMLInputElement | null) => {
    if (element) {
      element.focus();
      requestAnimationFrame(() => {
        element.select();
      });
    }
  };

  const handleSubmit = async () => {
    setError(false);
    const newInvalidInputs = [];

    for (let i = 0; i < INPUT_SIZE; i++) {
      newInvalidInputs[i] = !code[i] || isNaN(Number(code[i])) ? true : false;
    }
    setInvalidInputs(newInvalidInputs);

    try {
      const response = await axios.post("http://localhost:3000/verify", {
        code,
      });
      if (response?.data?.success) {
        navigate("success");
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
      console.error("An error occured: ", e);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] h-screen flex flex-col mt-28 items-center gap-10">
        <div className="w-full flex justify-center">
          <p className="font-bold text-lg">Verification Code</p>
        </div>
        <div className="w-full flex gap-4 justify-center">
          {[...Array(INPUT_SIZE)].map((_, index) => (
            <input
              className={`w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 ${
                invalidInputs[index]
                  ? "border-red-300 bg-red-50 hover:border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-50"
                  : ""
              }`}
              type="text"
              name="code"
              key={index}
              value={code[index] || ""}
              autoComplete="off"
              ref={(ref) => (inputRefs.current[index] = ref)}
              onInput={(e) => handleInput(e.currentTarget, index)}
              onClick={handleClick}
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="flex flex-row items-center justify-center text-center border w-96 rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
        >
          Submit
        </button>
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400 w-96 flex justify-center"
            role="alert"
          >
            <span className="font-medium">Verification Error!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationCode;
