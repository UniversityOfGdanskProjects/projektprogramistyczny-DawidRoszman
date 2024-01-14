"use client";

import { useRef } from "react";

function WatchTrailer({ trailer }: { trailer: string }) {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => modalRef.current?.showModal()}
      >
        Watch trailer
      </button>
      <dialog ref={modalRef} id="my_modal_2" className="modal">
        <div className="modal-box max-w-3xl">
          <iframe
            className="m-20"
            width="560"
            height="315"
            src={trailer}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
export default WatchTrailer;
