"use client";
function GoBackBtn() {
  return (
    <button
      onClick={() => window.history.back()}
      className="btn btn-primary w-24 absolute m-3"
    >
      Go Back
    </button>
  );
}

export default GoBackBtn;
