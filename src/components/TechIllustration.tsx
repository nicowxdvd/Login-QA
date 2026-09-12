export default function TechIllustration() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-auto w-full max-w-sm"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tech-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#27272a" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
        <linearGradient id="tech-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* circuit lines */}
      <g stroke="#7c3aed" strokeOpacity="0.35" strokeWidth="1.5" fill="none">
        <path d="M20 40 H100 V80" />
        <path d="M380 260 H300 V220" />
        <path d="M30 260 H80 V230" />
        <path d="M370 30 H320 V60" />
      </g>
      <g fill="#a78bfa" fillOpacity="0.6">
        <circle cx="20" cy="40" r="3" />
        <circle cx="100" cy="80" r="3" />
        <circle cx="380" cy="260" r="3" />
        <circle cx="300" cy="220" r="3" />
        <circle cx="30" cy="260" r="3" />
        <circle cx="80" cy="230" r="3" />
        <circle cx="370" cy="30" r="3" />
        <circle cx="320" cy="60" r="3" />
      </g>

      {/* editor window */}
      <rect
        x="60"
        y="60"
        width="280"
        height="180"
        rx="10"
        fill="url(#tech-window)"
        stroke="#3f3f46"
      />
      <rect x="60" y="60" width="280" height="26" rx="10" fill="#27272a" />
      <circle cx="76" cy="73" r="4" fill="#f87171" />
      <circle cx="90" cy="73" r="4" fill="#fbbf24" />
      <circle cx="104" cy="73" r="4" fill="#34d399" />

      {/* code lines */}
      <g>
        <rect x="80" y="102" width="60" height="6" rx="3" fill="#a78bfa" />
        <rect x="146" y="102" width="90" height="6" rx="3" fill="#71717a" />

        <rect x="96" y="122" width="40" height="6" rx="3" fill="#7c3aed" />
        <rect x="142" y="122" width="120" height="6" rx="3" fill="#52525b" />

        <rect x="96" y="142" width="70" height="6" rx="3" fill="#7c3aed" />
        <rect x="172" y="142" width="60" height="6" rx="3" fill="#52525b" />

        <rect x="80" y="162" width="30" height="6" rx="3" fill="#a78bfa" />
        <rect x="116" y="162" width="150" height="6" rx="3" fill="#71717a" />

        <rect x="96" y="182" width="100" height="6" rx="3" fill="#52525b" />

        <rect x="80" y="202" width="20" height="6" rx="3" fill="#a78bfa" />
        <rect x="106" y="202" width="80" height="6" rx="3" fill="#71717a" />
      </g>

      {/* scanning highlight line */}
      <rect x="80" y="141" width="220" height="9" rx="4" fill="url(#tech-line)" opacity="0.5" />

      {/* floating glow accents */}
      <circle cx="340" cy="60" r="18" fill="#7c3aed" fillOpacity="0.25" />
      <circle cx="70" cy="240" r="14" fill="#a78bfa" fillOpacity="0.25" />
    </svg>
  );
}
