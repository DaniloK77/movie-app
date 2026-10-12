// Small inline icons. All take className so size/color come from Tailwind.

const base = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
}

export const SearchIcon = ({ className }) => (
    <svg {...base} className={className}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
    </svg>
)

export const CloseIcon = ({ className }) => (
    <svg {...base} className={className}>
        <path d="M18 6 6 18M6 6l12 12" />
    </svg>
)

export const HeartIcon = ({ className, filled = false }) => (
    <svg {...base} className={className} fill={filled ? "currentColor" : "none"}>
        <path d="M12 21s-6-4.35-9-9a5.5 5.5 0 0 1 9-7 5.5 5.5 0 0 1 9 7c-3 4.65-9 9-9 9z" />
    </svg>
)

export const StarIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
    </svg>
)

export const PlayIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11.1-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14z" />
    </svg>
)

export const ChevronIcon = ({ className }) => (
    <svg {...base} className={className}>
        <path d="m9 6 6 6-6 6" />
    </svg>
)

export const ArrowLeftIcon = ({ className }) => (
    <svg {...base} className={className}>
        <path d="M19 12H5m6-6-6 6 6 6" />
    </svg>
)

export const ExternalIcon = ({ className }) => (
    <svg {...base} className={className}>
        <path d="M14 4h6v6m0-6-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
)

export const FilmIcon = ({ className }) => (
    <svg {...base} className={className}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 3v18M17 3v18M3 8h4M3 12h18M3 16h4M17 8h4M17 16h4" />
    </svg>
)
