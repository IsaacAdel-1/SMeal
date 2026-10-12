export default function ClocheIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      fill="#f49896"
    >
      <g transform="rotate(-10 50 50)">
        {/* المقبض */}
        <rect x="44" y="14" width="12" height="10" rx="4" />
        {/* القبة */}
        <path d="M14 66 A36 36 0 0 1 86 66 Q86 72 80 72 H20 Q14 72 14 66 Z" />
        {/* القاعدة */}
        <rect x="8" y="80" width="84" height="9" rx="4.5" />
      </g>
    </svg>
  );
}