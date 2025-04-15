const ErrorMessage = ({ errorMessage }) => {
  return (
    errorMessage && (
      <div className="mt-3 text-lg text-red-500 font-bold">
        {errorMessage || "Something went wrong"}
      </div>
    )
  );
};

export default ErrorMessage;
