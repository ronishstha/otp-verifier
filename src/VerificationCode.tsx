import { KeyboardEvent, useEffect, useRef, useState } from "react";

const VerificationCode = () => {
  const [code, setCode] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
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
    const pasteData = e?.clipboardData.getData("text").slice(0, 6);
    setCode(pasteData.padEnd(6, ""));
    inputRefs.current.forEach((input, index) => {
      if (input) {
        input.value = pasteData[index] || "";
      }
    });

    if (pasteData.length < 6) {
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

  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] h-screen flex flex-col mt-28 items-center">
        <div className="w-full flex justify-center">
          <p className="font-bold text-lg">Verification Code</p>
        </div>
        <div className="w-full flex mt-10 gap-4 justify-center">
          {[...Array(6)].map((_, index) => (
            <input
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              type="text"
              name="code"
              key={index}
              value={code[index] || ""}
              autoComplete="off"
              ref={(ref) => (inputRefs.current[index] = ref)}
              onChange={(e) => handleChange(e.target, index)}
              onClick={handleClick}
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <button className="mt-10 flex flex-row items-center justify-center text-center border w-96 rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
          Submit
        </button>
      </div>
    </div>
  );
};

export default VerificationCode;
