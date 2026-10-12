import { Link } from "react-router-dom"
import { posterUrl } from "../services/api"
import { useMovieContext } from "../context/useMovieContext"
import Poster from "./Poster"
import Rating from "./Rating"
import { HeartIcon } from "./icons"

// Featured movie banner. The API only gives us portrait posters, so the
// backdrop is the same poster, enlarged and blurred.
function Hero({ movie }) {
    const { isFavorite, toggleFavorite } = useMovieContext()
    const favorite = isFavorite(movie.id)

    return (
        <section
            aria-label="Featured movie"
            className="relative isolate animate-fade-up overflow-hidden rounded-3xl
                border border-line bg-surface"
        >

            <img
                src={posterUrl(movie, 200)}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="absolute inset-0 -z-20 size-full scale-125 object-cover
                    opacity-50 blur-3xl"
            />
            <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/50 to-ink/20
                md:bg-linear-to-r md:from-ink md:via-ink/70 md:to-transparent" />

            <div className="flex flex-col items-center gap-8 p-6 sm:p-10 md:flex-row md:p-12">

                <Poster
                    movie={movie}
                    width={500}
                    lazy={false}
                    alt={`Poster for ${movie.title}`}
                    className="w-40 shrink-0 rounded-xl shadow-2xl shadow-black/70
                        ring-1 ring-white/15 sm:w-48 md:order-2 md:ml-auto md:w-60"
                />

                <div className="max-w-xl text-center md:order-1 md:text-left">

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                        Featured
                    </p>

                    <h1 className="mt-3 font-display text-3xl font-bold leading-tight
                        sm:text-4xl lg:text-5xl">
                        {movie.title}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4
                        gap-y-2 text-sm text-muted md:justify-start">
                        <Rating value={movie.rating} />
                        {movie.maturityRating && (
                            <span className="rounded border border-white/25 px-1.5 py-0.5
                                text-xs text-white/80">
                                {movie.maturityRating}
                            </span>
                        )}
                        {movie.category && <span>{movie.category}</span>}
                        {movie.price && <span className="font-medium text-white">{movie.price}</span>}
                    </div>

                    {movie.description && (
                        <p className="mt-5 line-clamp-4 text-sm leading-relaxed text-white/75 sm:text-base">
                            {movie.description}
                        </p>
                    )}

                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3
                        md:justify-start">
                        <Link
                            to={`/movie/${encodeURIComponent(movie.id)}`}
                            className="rounded-full bg-accent px-7 py-3 text-sm font-semibold
                                text-white shadow-lg shadow-accent/25 transition
                                hover:bg-accent-hover"
                        >
                            View details
                        </Link>
                        <button
                            type="button"
                            onClick={() => toggleFavorite(movie)}
                            aria-pressed={favorite}
                            className="inline-flex items-center gap-2 rounded-full border
                                border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold
                                backdrop-blur transition hover:bg-white/15"
                        >
                            <HeartIcon
                                filled={favorite}
                                className={`size-4 ${favorite ? "text-accent" : ""}`}
                            />
                            {favorite ? "In favorites" : "Add to favorites"}
                        </button>
                    </div>

                </div>

            </div>

        </section>
    )
}

export default Hero
