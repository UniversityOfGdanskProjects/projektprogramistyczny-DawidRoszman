"use client";
function ErrorPage({ errorMessage }: { errorMessage: string }) {
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <div className="text-2xl">
        Something went wrong. Please try again later or contact the
        administrator.
      </div>
      <div>
        <h1 className="text-xl">{errorMessage}</h1>
      </div>
      <div>
        <button className="btn btn-primary" onClick={goBack}>
          Go back
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
