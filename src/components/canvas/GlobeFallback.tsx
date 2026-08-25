/**
 * Static CSS stand-in for the Trade Globe — used while the WebGL chunk loads, when WebGL is
 * unavailable, and for no-JS renders. Deliberately has no Three.js imports so the Hero can
 * import it statically without pulling the 3D stack into the SSR bundle.
 */
export default function GlobeFallback() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
      <div className="relative aspect-square w-[min(80%,560px)]">
        <div className="absolute inset-0 rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_30%,rgba(0,102,255,0.18),rgba(9,10,12,0.9)_60%)] shadow-[0_0_120px_rgba(0,102,255,0.15)]" />
        <div className="absolute inset-[18%] rounded-full border border-white/[0.06]" />
        <div className="absolute inset-[36%] rounded-full border border-white/[0.05]" />
      </div>
    </div>
  );
}
