type CarIconProps = {
  color: string;
  name: string;
  className?: string;
};

const CarIcon = ({ color, name, className = "h-10 w-20" }: CarIconProps) => (
  <svg
    viewBox="0 0 120 56"
    className={className}
    role="img"
    aria-label={`${name} car`}
    style={{ color }}
  >
    <g stroke="#050a12" strokeWidth="2">
      <rect x="13" y="4" width="94" height="48" rx="20" fill="currentColor" />
      <path
        d="M35 6c10-4 40-4 50 0l10 13v18L85 50c-11 4-39 4-50 0L25 37V19L35 6z"
        fill="currentColor"
      />
      <path d="M39 7h40" stroke="#fff" strokeOpacity=".48" strokeWidth="3" />
      <path d="M36 12h48l7 10H29l7-10zM29 34h62l-7 11H36l-7-11z" fill="#102033" />
      <path d="M58 7h4v42h-4z" fill="#dbeafe" fillOpacity=".7" stroke="none" />
      <path d="M18 14h9M18 42h9M93 14h9M93 42h9" stroke="#02060c" strokeWidth="6" />
      <path d="M14 23h7v10h-7M106 23h-7v10h7" fill="#ffd43b" />
    </g>
  </svg>
);

export default CarIcon;
