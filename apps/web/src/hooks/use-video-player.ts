import { useState } from "react";

export function useVideoPlayer() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleVideoLoadedData = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    setHasError(true);
    setIsVideoLoaded(false);
  };

  return {
    isVideoLoaded,
    hasError,
    handleVideoLoadedData,
    handleVideoError,
  };
}
