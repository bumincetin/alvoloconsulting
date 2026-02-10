"use client";

import HlsVideo from "@/components/Media/HlsVideo";

const VIDEO_SRC =
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/697945ca6b876878dba3b23fbd2f1561/manifest/video.m3u8";

export default function HlsVideoBackground() {
  return (
    <HlsVideo
      src={VIDEO_SRC}
      className="absolute inset-0 h-full w-full object-cover grayscale contrast-150 brightness-90"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
    />
  );
}
