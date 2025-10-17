"use client";

import { useState } from "react";

type HeroProps = {
  desktopVideoId?: string;
  mobileVideoId?: string;
  posterUrl?: string;
  overlayContent?: React.ReactNode;
  className?: string;
};

export default function Hero({
  desktopVideoId = "282995_tiny_v9w8sa.mp4",
  mobileVideoId = "307864_tiny_p3smba.mp4",
  posterUrl = "/desktop-static.png",
  overlayContent,
  className = "",
}: HeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const handleVideoLoadedData = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    setHasError(true);
    setIsVideoLoaded(false);
  };

  // Generate Cloudinary URLs with optimizations
  const desktopVideoUrl = cloudName
    ? `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto:low,w_1920/${desktopVideoId}`
    : "https://res.cloudinary.com/dulwhlyqt/video/upload/v1760739350/282995_tiny_v9w8sa.mp4";

  const mobileVideoUrl = cloudName
    ? `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto:low,w_768/${mobileVideoId}`
    : "https://res.cloudinary.com/dulwhlyqt/video/upload/v1760739349/307864_tiny_p3smba.mp4";

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
          isVideoLoaded && !hasError ? "opacity-100" : "opacity-0"
        }`}
        loop
        muted
        onError={handleVideoError}
        onLoadedData={handleVideoLoadedData}
        playsInline
        poster={posterUrl}
        preload="auto"
      >
        <source media="(max-width: 768px)" src={mobileVideoUrl} />
        <source src={desktopVideoUrl} />
        Your browser does not support the video tag.
      </video>

      {/* Poster Image Fallback */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full bg-center bg-cover bg-no-repeat transition-opacity duration-500 ${
          isVideoLoaded && !hasError ? "opacity-0" : "opacity-100"
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
