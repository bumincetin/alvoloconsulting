'use client';

import HlsVideo from './HlsVideo';

interface PageVideoBackgroundProps {
    src: string;
}

/**
 * A fixed, full-screen HLS video background with a dark overlay.
 * Drop this inside any <main> and change `bg-void-black` → `bg-transparent`
 * on the <main> itself.
 */
export default function PageVideoBackground({ src }: PageVideoBackgroundProps) {
    return (
        <>
            <HlsVideo
                src={src}
                className="fixed inset-0 h-full w-full object-cover -z-50 opacity-30 pointer-events-none grayscale mix-blend-luminosity"
            />
            <div className="fixed inset-0 bg-void-black/80 -z-40 pointer-events-none" />
        </>
    );
}
