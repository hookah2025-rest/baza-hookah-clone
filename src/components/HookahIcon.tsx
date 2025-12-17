interface HookahIconProps {
  className?: string;
}

export const HookahIcon = ({ className = "w-4 h-4" }: HookahIconProps) => {
  return (
    <svg
      viewBox="0 0 24 32"
      fill="currentColor"
      className={className}
    >
      {/* Hookah base */}
      <ellipse cx="12" cy="28" rx="8" ry="3" />
      {/* Hookah body */}
      <path d="M8 28 L8 20 Q8 16 12 16 Q16 16 16 20 L16 28" />
      {/* Hookah neck */}
      <rect x="10" y="8" width="4" height="8" />
      {/* Hookah top */}
      <ellipse cx="12" cy="6" rx="5" ry="3" />
      <ellipse cx="12" cy="4" rx="3" ry="2" />
    </svg>
  );
};
