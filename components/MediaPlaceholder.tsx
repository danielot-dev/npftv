export default function MediaPlaceholder({
  className = "",
  variant = "navy",
}: {
  className?: string;
  variant?: "navy" | "gold";
}) {
  const bg = variant === "navy" ? "#0F2A4A" : "#C9A227";
  const line = variant === "navy" ? "#1C3F66" : "#E0C158";

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: bg }}>
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 200 120"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1={-40 + i * 30}
            y1="0"
            x2={i * 30}
            y2="120"
            stroke={line}
            strokeWidth="2"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="16" stroke="#C9A227" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="4" fill="#C9A227" />
        </svg>
      </div>
    </div>
  );
}
