"use client";

import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { useAutoplayingCloudinaryVideo } from "./use-autoplaying-video";

export default function VideoBg() {
  const { containerRef, needsUserGesture, handleUserPlay } =
    useAutoplayingCloudinaryVideo();

  return (
    <div
      className="absolute inset-0 h-full w-full overflow-hidden"
      ref={containerRef}
    >
      <CldVideoPlayer
        aria-label="Hero Background video"
        autoPlay
        className="h-full w-full object-cover"
        controls={false}
        height="1080"
        id="hero-video"
        loop
        muted
        onError={(error: unknown) => {
          // Cloudinary Video.js error objects have player and video properties
          if (
            error &&
            typeof error === "object" &&
            "video" in error &&
            error.video
          ) {
            const videoElement = error.video as HTMLVideoElement;
            const errorCode = videoElement.error?.code;
            const errorMessage = videoElement.error?.message;

            if (errorCode !== undefined && errorMessage) {
              // biome-ignore lint/suspicious/noConsole: Error logging for debugging
              console.error("Video playback error:", {
                code: errorCode,
                message: errorMessage,
              });
            }
          } else {
            // biome-ignore lint/suspicious/noConsole: Error logging for debugging
            console.error("Video error:", error);
          }
        }}
        playsinline
        preload="auto"
        src="https://res.cloudinary.com/dulwhlyqt/video/upload/v1762102155/second-edit_ib52t7"
        width="1920"
      />
      {needsUserGesture ? (
        <button
          aria-label="Play background video"
          className="absolute inset-0 grid place-items-center"
          onClick={handleUserPlay}
          type="button"
        >
          <span className="rounded-full bg-black/60 px-5 py-3 text-white">
            Play video
          </span>
        </button>
      ) : null}
    </div>
  );
}
