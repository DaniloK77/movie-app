import { useId, useRef } from "react"
import MovieCard from "./MovieCard"
import { ChevronIcon } from "./icons"

// Horizontally scrolling shelf of movies, like a Play Store section.
function MovieRow({ title, subtitle, movies }) {
    const scroller = useRef(null)
    const headingId = useId()

    function scrollBy(direction) {
        const el = scroller.current
        if (!el) return
        el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" })
    }

    const arrow =
        "hidden size-9 place-items-center rounded-full border border-line bg-surface " +
        "text-white transition hover:bg-raised md:grid"

    return (
        <section aria-labelledby={headingId}>

            <div className="mb-4 flex items-end justify-between gap-4">

                <div>
                    <h2 id={headingId} className="font-display text-xl font-semibold sm:text-2xl">
                        {title}
                    </h2>
                    {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => scrollBy(-1)}
                        aria-label={`Scroll ${title} left`}
                        className={arrow}
                    >
                        <ChevronIcon className="size-5 rotate-180" />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollBy(1)}
                        aria-label={`Scroll ${title} right`}
                        className={arrow}
                    >
                        <ChevronIcon className="size-5" />
                    </button>
                </div>

            </div>

            <ul
                ref={scroller}
                className="scrollbar-none -mx-4 flex snap-x gap-4 overflow-x-auto scroll-smooth
                    scroll-px-4 px-4 pb-4 pt-1 sm:-mx-6 sm:scroll-px-6 sm:px-6
                    lg:-mx-8 lg:scroll-px-8 lg:px-8"
            >
                {movies.map((movie) => (
                    <li key={movie.id} className="w-36 shrink-0 snap-start sm:w-44 lg:w-48">
                        <MovieCard movie={movie} />
                    </li>
                ))}
            </ul>

        </section>
    )
}

export default MovieRow
