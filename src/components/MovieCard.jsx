import { Link } from "react-router-dom"
import FavoriteButton from "./FavoriteButton"
import Poster from "./Poster"
import Rating from "./Rating"

function MovieCard({movie}) {
    return (
        <article className="group relative">

            <Link
                to={`/movie/${encodeURIComponent(movie.id)}`}
                className="block rounded-xl"
            >

                <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-raised
                    ring-1 ring-line transition duration-300
                    group-hover:-translate-y-1 group-hover:ring-white/25
                    group-hover:shadow-2xl group-hover:shadow-black/60">

                    <Poster
                        movie={movie}
                        width={400}
                        className="size-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {movie.price && (
                        <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1
                            text-xs font-semibold backdrop-blur">
                            {movie.price}
                        </span>
                    )}

                </div>

                <h3 className="mt-3 line-clamp-1 text-sm font-medium text-white">
                    {movie.title}
                </h3>

                <p className="mt-0.5 flex items-center gap-2 text-xs text-muted">
                    <Rating value={movie.rating} />
                    {movie.category && (
                        <span className="line-clamp-1">{movie.category}</span>
                    )}
                </p>

            </Link>

            <FavoriteButton movie={movie} className="absolute right-2 top-2" />

        </article>
    )
}

export default MovieCard
