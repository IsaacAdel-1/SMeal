export default function BagIcon({ size = 24, ...props }: React.ComponentPropsWithoutRef<"svg"> & { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" width={size} height={size} fill="none" {...props}>
      <rect x="4" y="9" width="16" height="12" rx="3" fill="currentColor" />
      <path
        d="M8.5 9V7.5a3.5 3.5 0 0 1 7 0V9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}