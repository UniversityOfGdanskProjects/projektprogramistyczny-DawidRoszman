"use client";

import { useState } from "react";

function WatchTrailer({ trailer }: { trailer: string }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <div className="p-5">
      {isVideoOpen && (
        <div className="grid place-items-center rounded-lg fixed top-20 md:left-1/2 md:w-1/2 mt-10 translate-x-[-50%] bg-base-300  z-40 bg-opacity-90">
          <iframe
            className="m-20"
            width="560"
            height="315"
            src={trailer}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <button
            className="btn absolute right-0 top-0 p-3 text-3xl"
            onClick={() => setIsVideoOpen(false)}
          >
            X
          </button>
        </div>
      )}
      <button className="btn btn-primary" onClick={() => setIsVideoOpen(true)}>
        Watch trailer
      </button>
    </div>
  );
}

export default WatchTrailer;
