import { useState } from "react"
import { posterUrl } from "../services/api"
import { FilmIcon } from "./icons"

// Movie poster with a fallback chain: the size the layout asked for, then the
// small original thumbnail, then a placeholder.
//
// referrerPolicy="no-referrer" matters: Google's image host rejects some
// posters when the request carries a Referer from another site (such as
// localhost or the deployed app), but serves every one of them without it.
function Poster({ movie, width = 400, alt = "", lazy = true, className = "" }) {
    const [step, setStep] = useState(0)

    if (!movie.thumbnail || step > 1) {
        return (
            <div
                role={alt ? "img" : undefined}
                aria-label={alt || undefined}
                className={`grid aspect-2/3 place-items-center bg-raised text-muted ${className}`}
            >
                <FilmIcon className="size-10" />
            </div>
        )
    }

    return (
        <img
            src={step === 0 ? posterUrl(movie, width) : movie.thumbnail}
            alt={alt}
            loading={lazy ? "lazy" : undefined}
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setStep((current) => current + 1)}
            className={className}
        />
    )
}

export default Poster
