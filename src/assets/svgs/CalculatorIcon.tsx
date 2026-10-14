export default function CalculatorIcon({
  size = 24,
  ...props
}: React.ComponentPropsWithoutRef<"svg"> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M8 2h8a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z
           M8.5 4.5h7a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z
           M7.5 11.5h2v2h-2z M11 11.5h2v2h-2z M14.5 11.5h2v2h-2z
           M7.5 15h2v2h-2z M11 15h2v2h-2z M14.5 15h2v2h-2z
           M7.5 18.5h2v2h-2z M11 18.5h2v2h-2z M14.5 18.5h2v2h-2z"
      />
    </svg>
  );
}