/**
 * Video utility functions for Cloudinary video URL generation
 */

export function getCloudinaryVideoUrl(
  videoId: string,
  options: {
    width?: number;
    quality?: string;
    format?: string;
  } = {}
): string {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.split("@")[1] || "dulwhlyqt";

  const { width = 1920, quality = "auto:low", format = "auto" } = options;

  const transformations = [`f_${format}`, `q_${quality}`, `w_${width}`].join(
    ","
  );

  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformations}/${videoId}`;
}

export function getDesktopVideoUrl(videoId: string): string {
  return getCloudinaryVideoUrl(videoId, { width: 1920 });
}

export function getMobileVideoUrl(videoId: string): string {
  return getCloudinaryVideoUrl(videoId, { width: 768 });
}
