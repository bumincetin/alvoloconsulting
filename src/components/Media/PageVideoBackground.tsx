'use client';

import HlsVideo from './HlsVideo';

interface PageVideoBackgroundProps {
    src: string;
}

/**
 * A fixed, full-screen HLS video background with a dark overlay.
 * Drop this inside any <main> and change `bg-void-black` → `bg-transparent`
 * on the <main> itself.
 *
 * Uses lazy loading: the HLS stream only initialises once the element
 * scrolls into the viewport, saving bandwidth on render.
 */
export default function PageVideoBackground({ src }: PageVideoBackgroundProps) {
    return (
        <>
            <HlsVideo
                src={src}
                lazy
                className="fixed inset-0 h-full w-full object-cover -z-50 opacity-30 pointer-events-none grayscale mix-blend-luminosity"
            />
            <div className="fixed inset-0 bg-void-black/80 -z-40 pointer-events-none" />
        </>
    );
}
