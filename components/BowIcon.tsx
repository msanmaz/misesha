export function BowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 40"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M30 20 L10 9 C4 6 1 15 7 19 C13 23 24 21 30 20 Z" stroke="none" />
      <path d="M34 20 L54 9 C60 6 63 15 57 19 C51 23 40 21 34 20 Z" stroke="none" />
      <circle cx="32" cy="20" r="3.4" stroke="none" />
      <path
        d="M29 22 L23 33"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M35 22 L41 33"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
