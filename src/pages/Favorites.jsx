import { useMovieContext } from "../context/useMovieContext"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import MovieCard from "../components/MovieCard"
import { EmptyState } from "../components/States"

function Favorites() {

    const { favorites } = useMovieContext()

    useDocumentTitle("Favorites")

    return (
        <section aria-labelledby="favorites-heading" className="animate-fade-up">

            <h1 id="favorites-heading" className="font-display text-3xl font-bold sm:text-4xl">
                Your favorites
            </h1>

            <p className="mt-2 mb-8 text-sm text-muted">
                {favorites.length === 0
                    ? "Movies you save will show up here."
                    : `${favorites.length} saved ${favorites.length === 1 ? "movie" : "movies"}`}
            </p>

            {favorites.length === 0 ? (

                <EmptyState
                    title="No favorites yet"
                    actionTo="/"
                    actionLabel="Find a movie"
                >
                    Tap the heart on any movie to save it for later.
                </EmptyState>

            ) : (

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6
                    md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

                    {favorites.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}

                </div>

            )}

        </section>
    )
}

export default Favorites
