"use client";

import { useEffect, useRef, useCallback, forwardRef } from "react";
import Hls from "hls.js";
import { useInView } from "react-intersection-observer";

type HlsVideoProps = {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  /** When true, HLS.js only initialises after the element scrolls into view */
  lazy?: boolean;
  /** Native preload attribute – defaults to "none" for bandwidth savings */
  preload?: "none" | "metadata" | "auto";
  /** Optional poster image shown before video loads */
  poster?: string;
};

const HlsVideo = forwardRef<HTMLVideoElement, HlsVideoProps>(function HlsVideo(
  {
    src,
    className,
    autoPlay = true,
    loop = true,
    muted = true,
    playsInline = true,
    lazy = false,
    preload = "none",
    poster,
  },
  forwardedRef,
) {
  const internalRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Intersection Observer – fires once and stays true
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px", // start loading a little before visible
    skip: !lazy,         // skip observer when lazy is false
  });

  // Merge all refs (IntersectionObserver + forwarded + internal)
  const setRefs = useCallback(
    (node: HTMLVideoElement | null) => {
      internalRef.current = node;
      inViewRef(node);
      // Forward ref
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [inViewRef, forwardedRef],
  );

  // Should we init HLS? Either we're not lazy, or the element is in view
  const shouldInit = !lazy || inView;

  useEffect(() => {
    const video = internalRef.current;
    if (!video || !shouldInit) return;

    // Avoid double-init
    if (hlsRef.current) return;

    if (
      typeof window !== "undefined" &&
      "MediaSource" in window &&
      Hls.isSupported()
    ) {
      const hls = new Hls({
        enableWorker: true,

        // ── Quality / bandwidth tuning ──
        // Auto ABR, capped to the actual rendered size of the <video> element
        // so a 300×200 card never downloads a 1080p stream.
        startLevel: -1,
        capLevelToPlayerSize: true,

        // ── Buffer tuning ──
        // Default is 30 s ahead — far too much for background ambiance.
        maxBufferLength: 10,
        maxMaxBufferLength: 30,

        // lowLatencyMode is for real-time / live streams; turning it off
        // reduces unnecessary aggressive fetching for VOD content.
        lowLatencyMode: false,
      });

      hls.loadSource(src);
      hls.attachMedia(video);
      hlsRef.current = hls;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari native HLS
      video.src = src;
    }

    const handleCanPlay = () => {
      if (autoPlay) {
        video.play().catch(() => undefined);
      }
    };

    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src, autoPlay, shouldInit]);

  return (
    <video
      ref={setRefs}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      poster={poster}
    />
  );
});

export default HlsVideo;
