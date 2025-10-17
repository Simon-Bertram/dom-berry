"use client";

import { useState } from "react";

type HeroProps = {
  desktopVideoUrl?: string;
  mobileVideoUrl?: string;
  posterUrl?: string;
  overlayContent?: React.ReactNode;
  className?: string;
};

export default function Hero({
  desktopVideoUrl = "/282995_small.mp4",
  mobileVideoUrl = "/283431_small.mp4",
  posterUrl = "/desktop-static.png",
  overlayContent,
  className = "",
}: HeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoadedData = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section
      aria-label="Hero video section"
      className={`relative h-screen w-full overflow-hidden ${className}`}
    >
      {/* Video Element */}
      <video
        aria-label="Hero background video"
        autoPlay
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        loop
        muted
        onLoadedData={handleVideoLoadedData}
        playsInline
        poster={posterUrl}
        preload="metadata"
      >
        <source media="(max-width: 768px)" src={mobileVideoUrl} />
        <source src={desktopVideoUrl} />
        Your browser does not support the video tag.
      </video>

      {/* Poster Image Fallback */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full bg-center bg-cover bg-no-repeat transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${posterUrl})` }}
      />

      {/* Overlay Content */}
      {overlayContent && (
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <div className="mx-auto max-w-7xl px-4 text-center text-white">
            {overlayContent}
          </div>
        </div>
      )}
    </section>
  );
}
