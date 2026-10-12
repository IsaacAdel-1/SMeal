export default function BowlIcon({ className = "z-0" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      fill="#cd8688"
    >
      <g transform="rotate(12 50 55)">
        {/* القوس */}
        <path
          d="M16 36 Q50 6 84 36"
          fill="none"
          stroke="#cd8688"
          strokeWidth="9"
          strokeLinecap="round"
        />
        {/* نص الدايرة */}
        <path d="M10 50 H90 A40 40 0 0 1 10 50 Z" />
      </g>
    </svg>
  );
}