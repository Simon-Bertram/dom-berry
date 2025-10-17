export const SERVICES = [
  {
    id: "corporate-film",
    title: "Corporate Film",
    description:
      "Professional corporate videos for businesses, including promotional content, training videos, and company profiles.",
    features: [
      "High-quality production values",
      "Professional lighting and sound",
      "Multiple camera angles",
      "Post-production editing",
      "Brand-consistent messaging",
    ],
    startingPrice: "£2,000",
    duration: "1-3 days filming",
    deliverables: ["Final edited video", "Raw footage", "Social media cuts"],
  },
  {
    id: "live-event-coverage",
    title: "Live Event Coverage",
    description:
      "Comprehensive coverage of live events including conferences, weddings, concerts, and corporate gatherings.",
    features: [
      "Multi-camera setup",
      "Live streaming capabilities",
      "Real-time editing",
      "Professional audio capture",
      "Event highlights reel",
    ],
    startingPrice: "£1,500",
    duration: "Full day coverage",
    deliverables: [
      "Event highlights",
      "Full event recording",
      "Social media clips",
    ],
  },
  {
    id: "marketing-video",
    title: "Marketing Video (Social/Web)",
    description:
      "Engaging marketing videos designed for social media platforms and web use to boost your brand presence.",
    features: [
      "Platform-optimized formats",
      "Eye-catching visuals",
      "Compelling storytelling",
      "Call-to-action integration",
      "Multiple aspect ratios",
    ],
    startingPrice: "£800",
    duration: "1-2 days",
    deliverables: [
      "Social media versions",
      "Web-optimized video",
      "Thumbnail designs",
    ],
  },
  {
    id: "commercial-ad",
    title: "Commercial/Advertisement",
    description:
      "Professional commercial videos and advertisements that drive sales and increase brand awareness.",
    features: [
      "Strategic messaging",
      "Professional actors/models",
      "High-end production",
      "Market research integration",
      "A/B testing variants",
    ],
    startingPrice: "£3,000",
    duration: "2-5 days",
    deliverables: [
      "Final commercial",
      "Multiple versions",
      "Behind-the-scenes content",
    ],
  },
  {
    id: "wedding",
    title: "Wedding Videography",
    description:
      "Beautiful wedding films that capture your special day with cinematic quality and emotional storytelling.",
    features: [
      "Cinematic storytelling",
      "Multiple camera angles",
      "Drone footage (optional)",
      "Same-day edit",
      "Custom music integration",
    ],
    startingPrice: "£1,200",
    duration: "Full day",
    deliverables: [
      "Wedding film",
      "Ceremony highlights",
      "Reception highlights",
      "Teaser video",
    ],
  },
] as const;

export type Service = (typeof SERVICES)[number];
