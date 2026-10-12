import { StarIcon } from "./icons"

// Google Play ratings are on a 0-5 scale.
function Rating({ value, className = "" }) {
    if (!value) return null

    return (
        <span
            className={`inline-flex items-center gap-1 font-medium text-gold ${className}`}
            title={`Rated ${value} out of 5`}
        >
            <StarIcon className="size-3.5" />
            <span>{Number(value).toFixed(1)}</span>
        </span>
    )
}

export default Rating
