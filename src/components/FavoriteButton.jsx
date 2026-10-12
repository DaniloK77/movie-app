import { useMovieContext } from "../context/useMovieContext"
import { HeartIcon } from "./icons"

// Round heart toggle used on cards.
function FavoriteButton({ movie, className = "" }) {
    const { isFavorite, toggleFavorite } = useMovieContext()
    const favorite = isFavorite(movie.id)

    return (
        <button
            type="button"
            onClick={() => toggleFavorite(movie)}
            aria-pressed={favorite}
            aria-label={
                favorite
                    ? `Remove ${movie.title} from favorites`
                    : `Add ${movie.title} to favorites`
            }
            className={`grid size-9 place-items-center rounded-full bg-black/55
                ring-1 ring-white/10 backdrop-blur transition
                hover:scale-110 hover:bg-black/80 active:scale-95 ${className}`}
        >
            <HeartIcon
                filled={favorite}
                className={`size-5 transition ${
                    favorite ? "text-accent" : "text-white"
                }`}
            />
        </button>
    )
}

export default FavoriteButton
