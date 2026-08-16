type CarIconProps = {
  color: string;
  name: string;
  className?: string;
};

const CarIcon = ({ color, name, className = "h-10 w-20" }: CarIconProps) => (
  <svg
    viewBox="0 0 120 52"
    className={className}
    role="img"
    aria-label={`${name} car`}
    style={{ color }}
  >
    <path
      fill="currentColor"
      d="M17 34l8-18c2-5 7-8 12-8h43c6 0 11 3 15 8l12 18h6c4 0 7 3 7 7v4H0v-4c0-4 3-7 7-7h10zm19-18c-2 0-4 1-5 4l-6 14h70L85 20c-2-3-4-4-7-4H36z"
    />
    <circle cx="27" cy="43" r="9" fill="#1f2937" />
    <circle cx="91" cy="43" r="9" fill="#1f2937" />
    <circle cx="27" cy="43" r="4" fill="#d1d5db" />
    <circle cx="91" cy="43" r="4" fill="#d1d5db" />
  </svg>
);

export default CarIcon;
