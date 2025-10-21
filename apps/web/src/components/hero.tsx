"use client";

import { useVideoPlayer } from "@/hooks/use-video-player";
import { getDesktopVideoUrl, getMobileVideoUrl } from "@/lib/video-utils";

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
  const { isVideoLoaded, hasError, handleVideoLoadedData, handleVideoError } =
    useVideoPlayer();

  // Generate Cloudinary URLs with optimizations
  const desktopVideoUrl = getDesktopVideoUrl(desktopVideoId);
  const mobileVideoUrl = getMobileVideoUrl(mobileVideoId);

  return (
    <section
      aria-label="Hero video section"
      className={`relative h-screen w-full overflow-hidden ${className}`}
    >
      {/* Video Element - Always present to prevent CLS */}
      <video
        aria-label="Hero background video"
        autoPlay
        className="absolute inset-0 h-full w-full object-cover"
        loop
        muted
        onError={handleVideoError}
        onLoadedData={handleVideoLoadedData}
        playsInline
        poster={posterUrl}
        preload="auto"
        style={{
          opacity: isVideoLoaded && !hasError ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <source media="(max-width: 768px)" src={mobileVideoUrl} />
        <source src={desktopVideoUrl} />
        Your browser does not support the video tag.
      </video>

      {/* Poster Image Fallback - Always present to prevent CLS */}
      <div
        aria-hidden="true"
        className="absolute inset-0 h-full w-full bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${posterUrl})`,
          opacity: isVideoLoaded && !hasError ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
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
