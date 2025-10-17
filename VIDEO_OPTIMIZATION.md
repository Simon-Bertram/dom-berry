# Video Optimization Guide

## Current Video Files

Your site currently has these video files in `/public/`:

- `282995_small.mp4` (desktop hero video)
- `283431_small.mp4` (mobile hero video)

## Cost Optimization Recommendations

### 1. Video Compression (Immediate Impact)

**Current Issue**: Large video files consume significant bandwidth on Vercel's free tier (100 GB/month limit).

**Solutions**:

#### Option A: Further Compress Existing Videos

```bash
# Install FFmpeg (if not already installed)
# macOS: brew install ffmpeg
# Ubuntu: sudo apt install ffmpeg

# Compress desktop video (target: < 1MB)
ffmpeg -i 282995_small.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k 282995_optimized.mp4

# Compress mobile video (target: < 800KB)
ffmpeg -i 283431_small.mp4 -c:v libx264 -crf 30 -preset slow -c:a aac -b:a 96k 283431_optimized.mp4
```

#### Option B: Use Cloudinary Free Tier (Recommended)

- **Free Tier**: 25 GB storage, 25 GB bandwidth/month
- **Benefits**: Automatic optimization, multiple formats, CDN delivery
- **Setup**:
  1. Sign up at cloudinary.com
  2. Upload videos to Cloudinary
  3. Use optimized URLs in your Hero component

```typescript
// Example Cloudinary URLs
const desktopVideoUrl =
  "https://res.cloudinary.com/your-cloud/video/upload/f_auto,q_auto:low/282995_small.mp4";
const mobileVideoUrl =
  "https://res.cloudinary.com/your-cloud/video/upload/f_auto,q_auto:low,w_768/283431_small.mp4";
```

### 2. Implement Progressive Loading

Update your Hero component to use multiple quality levels:

```typescript
// In hero.tsx
<video>
  <source media="(max-width: 768px)" src={mobileVideoUrl} />
  <source media="(min-width: 769px)" src={desktopVideoUrl} />
  <source src={fallbackVideoUrl} /> {/* Lower quality fallback */}
</video>
```

### 3. Lazy Loading Optimization

Your current implementation is good, but consider:

```typescript
// Add intersection observer for better performance
const [shouldLoad, setShouldLoad] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  if (videoRef.current) {
    observer.observe(videoRef.current);
  }

  return () => observer.disconnect();
}, []);
```

### 4. Alternative: Use Next.js Image Component

For static hero videos, consider using optimized images instead:

```typescript
import Image from "next/image";

// Use optimized hero image with CSS animations
<Image
  src="/hero-optimized.jpg"
  alt="Dom Berry Videography"
  fill
  priority
  className="object-cover"
  sizes="100vw"
/>;
```

## Bandwidth Usage Estimation

### Current Setup (Estimated)

- Desktop video: ~2-3 MB
- Mobile video: ~1-2 MB
- 1,000 visitors/month: ~2.5 GB bandwidth
- **Status**: ✅ Within free tier (100 GB limit)

### With Optimization

- Desktop video: ~800 KB
- Mobile video: ~500 KB
- 1,000 visitors/month: ~1.3 GB bandwidth
- **Savings**: 50% bandwidth reduction

## Implementation Priority

1. **High Priority**: Compress existing videos (immediate 50% bandwidth savings)
2. **Medium Priority**: Implement Cloudinary (better performance + CDN)
3. **Low Priority**: Advanced lazy loading (marginal improvement)

## Monitoring

Track your bandwidth usage in Vercel dashboard:

- Go to your project → Analytics → Bandwidth
- Monitor monthly usage
- Set up alerts at 80% of free tier limit

## Future Considerations

When you exceed free tier limits:

- **Vercel Pro**: $20/month (1 TB bandwidth)
- **Cloudinary Pro**: $89/month (100 GB bandwidth)
- **Self-hosted CDN**: AWS CloudFront, Cloudflare

For now, video compression alone should keep you well within free tier limits.
