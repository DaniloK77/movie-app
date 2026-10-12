import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { findSeenMovie } from "../services/api"
import { useMovieContext } from "../context/useMovieContext"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import Poster from "../components/Poster"
import Rating from "../components/Rating"
import { EmptyState } from "../components/States"
import { ArrowLeftIcon, ExternalIcon, HeartIcon, PlayIcon } from "../components/icons"

function MovieDetail() {
    const { id } = useParams()
    const { favorites, isFavorite, toggleFavorite } = useMovieContext()
    const [showTrailer, setShowTrailer] = useState(false)

    // The API has no "movie by id" lookup in this engine, so details come from
    // movies we already showed (or saved) earlier.
    const seen = useMemo(() => findSeenMovie(id), [id])
    const movie = seen ?? favorites.find((m) => m.id === id) ?? null

    useDocumentTitle(movie?.title ?? "Movie not found")

    if (!movie) {
        return (
            <EmptyState
                title="Movie not found"
                actionTo="/"
                actionLabel="Back to the store"
            >
                We only keep details for movies you've browsed in this session.
                Open it from the home page or search for it again.
            </EmptyState>
        )
    }

    const favorite = isFavorite(movie.id)

    return (
        <article className="animate-fade-up">

            <Link
                to="/"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition hover:text-white"
            >
                <ArrowLeftIcon className="size-4" />
                All movies
            </Link>

            <div className="flex flex-col gap-8 md:flex-row md:gap-12">

                <Poster
                    movie={movie}
                    width={600}
                    lazy={false}
                    alt={`Poster for ${movie.title}`}
                    className="w-56 shrink-0 self-center rounded-2xl shadow-2xl shadow-black/60
                        ring-1 ring-line md:w-72 md:self-start"
                />

                <div className="min-w-0 flex-1">

                    <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                        {movie.title}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
                        <Rating value={movie.rating} />
                        {movie.maturityRating && (
                            <span className="rounded border border-white/25 px-1.5 py-0.5 text-xs text-white/80">
                                {movie.maturityRating}
                            </span>
                        )}
                        {movie.category && <span>{movie.category}</span>}
                    </div>

                    {movie.price && (
                        <p className="mt-6 text-sm text-muted">
                            Buy or rent from{" "}
                            <span className="text-lg font-semibold text-white">{movie.price}</span>
                        </p>
                    )}

                    <div className="mt-6 flex flex-wrap gap-3">

                        {movie.trailer && (
                            <button
                                type="button"
                                onClick={() => setShowTrailer((shown) => !shown)}
                                aria-expanded={showTrailer}
                                className="inline-flex items-center gap-2 rounded-full bg-accent px-6
                                    py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25
                                    transition hover:bg-accent-hover"
                            >
                                <PlayIcon className="size-4" />
                                {showTrailer ? "Hide trailer" : "Watch trailer"}
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => toggleFavorite(movie)}
                            aria-pressed={favorite}
                            className="inline-flex items-center gap-2 rounded-full border
                                border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold
                                transition hover:bg-white/15"
                        >
                            <HeartIcon
                                filled={favorite}
                                className={`size-4 ${favorite ? "text-accent" : ""}`}
                            />
                            {favorite ? "In favorites" : "Add to favorites"}
                        </button>

                        <a
                            href={movie.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border
                                border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold
                                transition hover:bg-white/15"
                        >
                            Google Play
                            <ExternalIcon className="size-4" />
                        </a>

                    </div>

                    {showTrailer && movie.trailer && (
                        <div className="mt-8 aspect-video overflow-hidden rounded-2xl bg-black ring-1 ring-line">
                            <iframe
                                src={movie.trailer}
                                title={`${movie.title} trailer`}
                                allow="autoplay; encrypted-media; fullscreen"
                                allowFullScreen
                                className="size-full"
                            />
                        </div>
                    )}

                    {movie.description && (
                        <section className="mt-8">
                            <h2 className="font-display text-lg font-semibold">Overview</h2>
                            <p className="mt-3 max-w-prose whitespace-pre-line leading-relaxed text-white/75">
                                {movie.description}
                            </p>
                        </section>
                    )}

                </div>

            </div>

        </article>
    )
}

export default MovieDetail
