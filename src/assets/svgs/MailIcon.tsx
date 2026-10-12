export default function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M3 5h18a1 1 0 0 1 1 1v.4l-10 6.25L2 6.4V6a1 1 0 0 1 1-1Z" />
      <path d="M22 8.75V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8.75l9.47 5.92a1 1 0 0 0 1.06 0L22 8.75Z" />
    </svg>
  );
}