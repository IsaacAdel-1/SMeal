import type { ComponentPropsWithoutRef } from "react";

type TrackingIconProps = Omit<
  ComponentPropsWithoutRef<"svg">,
  "color" | "width" | "height"
> & {
  size?: number;
  color?: string;
};

export default function TrackingIcon({
  size = 24,
  color = "currentColor",
  ...props
}: TrackingIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="17 16 66 108"
      width={size}
      height={(size * 108) / 66}
      fill="none"
      role="img"
      aria-label="Route between two locations"
      {...props}
    >
      <g fill={color}>
        {/* Pin 1 (top) */}
        <path
          fillRule="evenodd"
          d="M30 50 C30 50 17 38 17 29 A13 13 0 0 1 43 29 C43 38 30 50 30 50 Z M30 24.5 A4.5 4.5 0 1 0 30 33.5 A4.5 4.5 0 1 0 30 24.5 Z"
        />

        {/* Pin 2 (bottom) */}
        <path
          fillRule="evenodd"
          d="M70 124 C70 124 57 112 57 103 A13 13 0 0 1 83 103 C83 112 70 124 70 124 Z M70 98.5 A4.5 4.5 0 1 0 70 107.5 A4.5 4.5 0 1 0 70 98.5 Z"
        />
      </g>

      {/* Road */}
      <path
        d="M30 49 C30 64 50 58 50 72 S70 76 70 93"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}