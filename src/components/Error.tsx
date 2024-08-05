interface ErrorProps {
  message?: string;
}

const Error = ({ message = "Verification Error!" }: ErrorProps) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400 w-96 flex justify-center"
      role="alert"
    >
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Error;
