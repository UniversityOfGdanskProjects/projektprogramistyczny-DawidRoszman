"use client";

function GoBackBtn() {
  const goBack = () => {
    const currLocation = window.location.href;
    const split = currLocation.split("/");
    split.pop();
    const newLocation = split.join("/");
    window.location.href = newLocation;
  };
  return (
    <button
      onClick={() => goBack()}
      className="btn btn-primary w-24 absolute m-3"
    >
      Go Back
    </button>
  );
}

export default GoBackBtn;
