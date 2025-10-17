# Video Optimization Guide

## Current Video Files

Your site uses Cloudinary-hosted videos with the following public IDs:

- `282995_small` (desktop hero video)
- `283431_small` (mobile hero video)

## Cloudinary Integration

### Environment Setup

Add to `apps/web/.env.local`:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
```

### Optimized Video URLs

The hero component now uses Cloudinary URLs with automatic optimizations:

- **Desktop**: `https://res.cloudinary.com/{cloudName}/video/upload/f_auto,q_auto:low,w_1920/282995_small`
- **Mobile**: `https://res.cloudinary.com/{cloudName}/video/upload/f_auto,q_auto:low,w_768/283431_small`

### URL Parameters Explained

- `f_auto` - Automatic format selection (WebM, MP4, etc.)
- `q_auto:low` - Automatic quality optimization for background videos
- `w_1920` / `w_768` - Width optimization for desktop/mobile

## Performance Optimizations Implemented

### 1. Cloudinary CDN Delivery ✅

**Benefits**:

- **Global CDN**: Reduced latency worldwide
- **Automatic Optimization**: Format and quality adjusted per device/browser
- **Bandwidth Savings**: ~50% reduction with `q_auto:low`
- **Free Tier**: 25 GB bandwidth/month

### 2. Prioritized Loading ✅

**Changes Made**:

- `preload="auto"` - Prioritized loading for above-the-fold content
- `fetchPriority="high"` - Browser prioritization
- Error handling with fallback to poster image

## Component Implementation

### Hero Component Updates

The `hero.tsx` component now includes:

```typescript
// Cloudinary URL generation with fallback
const desktopVideoUrl = cloudName
  ? `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto:low,w_1920/${desktopVideoId}`
  : "/282995_small.mp4";

// Error handling and prioritized loading
<video
  fetchPriority="high"
  preload="auto"
  onError={handleVideoError}
  onLoadedData={handleVideoLoadedData}
>
  <source media="(max-width: 768px)" src={mobileVideoUrl} />
  <source src={desktopVideoUrl} />
</video>;
```

## Bandwidth Usage Estimation

### With Cloudinary Optimization

- Desktop video: ~800 KB (with `q_auto:low`)
- Mobile video: ~500 KB (with `q_auto:low`)
- 1,000 visitors/month: ~1.3 GB bandwidth
- **Status**: ✅ Well within Cloudinary free tier (25 GB limit)

### Performance Benefits

- **50% bandwidth reduction** compared to original videos
- **Global CDN delivery** reduces latency
- **Automatic format optimization** (WebM for supported browsers)
- **Device-specific sizing** (1920px desktop, 768px mobile)

## Monitoring

Track your bandwidth usage in Cloudinary dashboard:

- Go to your Cloudinary account → Usage
- Monitor monthly bandwidth consumption
- Set up alerts at 80% of free tier limit (20 GB)

## Future Considerations

When you exceed Cloudinary free tier limits:

- **Cloudinary Pro**: $89/month (100 GB bandwidth)
- **Alternative**: Self-hosted with CDN (AWS CloudFront, Cloudflare)
- **Hybrid approach**: Critical videos on Cloudinary, others self-hosted

The current implementation should keep you well within free tier limits for significant growth.
