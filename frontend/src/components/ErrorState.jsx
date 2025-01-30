const ErrorState = ({ errorMessage, onRetry }) => {
    return (
      <div className="text-center py-6 text-red-600">
        {errorMessage}
        <br />
        <button
          onClick={onRetry}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  };
  
  export default ErrorState;
  