// components/BrandLoader.tsx
// Centered logo-outline loader. Works in server and client components.
// The loader fades in after a short delay, so fast page loads never flash it.

type BrandLoaderProps = {
  /** Width of the logo in px */
  size?: number;
  /** Color of the moving line */
  color?: string;
  /** Color of the faint outline behind it */
  trackColor?: string;
  /** Seconds for one full lap around the logo */
  duration?: number;
  /** Milliseconds to wait before the loader becomes visible */
  delay?: number;
  /** Extra classes for the wrapper (e.g. to change min height) */
  className?: string;
};

const LOGO_PATH =
  "M305 47 L353 81 L749 81 L800 127 L1543 127 L1707 272 Q1725 290 1725 322 L1725 508 L1688 563 L1722 621 L1722 830 L1507 830 L1606 721 L1428 546 L1364 546 L1274 614 L1017 614 L1017 830 L763 830 L873 719 L457 326 L432 326 L279 463 L207 463 L27 293 L127 293 L305 114 Z";

export default function BrandLoader({
  size = 220,
  color = "#111827",
  trackColor = "rgba(17, 24, 39, 0.15)",
  duration = 1.8,
  delay = 150,
  className = "",
}: BrandLoaderProps) {
  return (
    <div
      className={`brand-loader ${className}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      style={{ animationDelay: `${delay}ms` }}
    >
      <svg
        viewBox="0 20 1752 830"
        width={size}
        style={{ maxWidth: "70vw", height: "auto", overflow: "visible" }}
        aria-hidden="true"
      >
        <path
          d={LOGO_PATH}
          pathLength={100}
          fill="none"
          stroke={trackColor}
          strokeWidth={18}
          strokeLinejoin="round"
        />
        <path
          className="brand-loader-run"
          d={LOGO_PATH}
          pathLength={100}
          fill="none"
          stroke={color}
          strokeWidth={20}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray="20 80"
          style={{ animationDuration: `${duration}s` }}
        />
      </svg>
      <span className="brand-loader-sr">Loading</span>

      <style>{`
        .brand-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 60vh;
          opacity: 0;
          animation: brand-loader-fade 200ms ease-out forwards;
        }
        .brand-loader-run {
          animation: brand-loader-move 1.8s linear infinite;
        }
        .brand-loader-sr {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
        }
        @keyframes brand-loader-fade {
          to { opacity: 1; }
        }
        @keyframes brand-loader-move {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -100; }
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-loader-run {
            animation: none;
            stroke-dasharray: 100 0;
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
