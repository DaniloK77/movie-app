import { useMovieContext } from "../context/MovieContext"
import MovieCard from "../components/MovieCard"

function Favorites() {

    const { favorites } = useMovieContext()

    return (
        <div className="w-full flex-1 p-8 max-w-350 mx-auto">

           
            <div className="w-full flex flex-col items-center justify-center mb-14">

                <h1 className="text-5xl font-bold text-transparent bg-clip-text 
                    bg-linear-to-r from-red-500 via-blue-500 to-purple-500
                    tracking-wide text-center">

                    Your Favorites ❤️

                </h1>

                <div className="w-32 h-1 mt-4 rounded-full 
                    bg-linear-to-r from-red-500 to-purple-500 shadow-lg">
                </div>

            </div>

            
            {favorites.length === 0 ? (

                <div className="text-center p-14 bg-white/5 backdrop-blur-md 
                    rounded-2xl shadow-2xl border border-white/10 
                    max-w-lg mx-auto">

                    <h2 className="mb-4 text-3xl font-bold text-red-500">
                        No Favorite Movies Yet
                    </h2>

                    <p className="text-gray-400 text-lg">
                        Start adding movies to your favorites
                    </p>

                </div>

            ) : (

             
                <div className="grid grid-cols-1 
                    sm:grid-cols-2 
                    lg:grid-cols-3 
                    xl:grid-cols-4 
                    gap-8">

                    {favorites.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}

                </div>

            )}

        </div>
    )
}

export default Favorites