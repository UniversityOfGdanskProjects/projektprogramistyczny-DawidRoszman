"use client";

import { useRouter } from "next/navigation";

function GoBackBtn() {
  const router = useRouter();
  const goBack = () => {
    router.back();
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
