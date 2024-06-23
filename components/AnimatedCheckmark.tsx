import React from "react";

interface AnimatedCheckmarkProps {
  size?: number;
  color?: string;
}

const AnimatedCheckmark: React.FC<AnimatedCheckmarkProps> = ({
  size = 38,
  color = "text-green-500",
}) => {
  return (
    <div className={`relative ${color}`} style={{ width: size, height: size }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="checkmark-circle"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="checkmark-check"
          d="M6 12l4 4 8-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <style jsx>{`
        .checkmark-circle {
          animation: draw-circle 0.5s ease-out forwards;
        }
        .checkmark-check {
          stroke-dasharray: 22;
          stroke-dashoffset: 22;
          animation: draw-check 0.5s 0.5s ease-out forwards;
        }
        @keyframes draw-circle {
          from {
            stroke-dasharray: 0 31.4;
          }
          to {
            stroke-dasharray: 31.4 0;
          }
        }
        @keyframes draw-check {
          from {
            stroke-dashoffset: 22;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedCheckmark;
