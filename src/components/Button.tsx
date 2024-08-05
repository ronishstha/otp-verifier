interface ButtonProps {
  label: string;
  onSubmit: () => void;
}

const Button = ({ onSubmit, label }: ButtonProps) => {
  return (
    <button
      onClick={onSubmit}
      className="flex flex-row items-center justify-center text-center border w-96 rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
    >
      {label}
    </button>
  );
};

export default Button;
