import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps {
  label: string;
  onSubmit: () => void;
  loading: boolean;
}

const Button = ({ onSubmit, label, loading }: ButtonProps) => {
  return (
    <button
      disabled={loading}
      onClick={onSubmit}
      className="flex flex-row items-center justify-center text-center border w-96 rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
    >
      {!loading ? label : <LoadingSpinner />}
    </button>
  );
};

export default Button;
