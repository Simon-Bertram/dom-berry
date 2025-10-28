"use client";

import { CldVideoPlayer } from "next-cloudinary";

type HeroProps = {
  videoId?: string;
  posterId?: string;
  overlayContent?: React.ReactNode;
  className?: string;
};

export default function Hero({
  videoId = "capcutreel_v0suld",
  posterId = "capcutreel-static_k13vdk",
  overlayContent,
  className = "",
}: HeroProps) {
  return (
    <section
      aria-label="Hero video section"
      className={`hero-section -z-50 h-[100vh] w-full overflow-hidden ${className}`}
    >
      {/* Cloudinary Video Player */}
      <CldVideoPlayer
        autoPlay={true}
        className="absolute top-0 right-0 left-0 h-full w-full object-cover"
        controls={false}
        height="1080"
        loop={true}
        muted={true}
        playsinline={true}
        poster={posterId}
        sourceTypes={["hls", "dash", "mp4"]}
        src={videoId}
        transformation={{
          streaming_profile: "hd",
          quality: "auto:low",
        }}
        width="1920"
      />

      {/* Overlay Content */}
      {overlayContent && (
        <div className="relative z-10 h-full w-full pt-[72px]">
          {overlayContent}
        </div>
      )}
    </section>
  );
}
