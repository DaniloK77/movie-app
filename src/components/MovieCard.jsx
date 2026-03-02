// import { useMovieContext } from "../context/MovieContext"

// function MovieCard({movie}) {

//     const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
//     const favorite = isFavorite(movie.id)

//     function onFavoriteClick(e) {
//         e.preventDefault()

//         if (favorite) {
//             removeFromFavorites(movie.id)
//         } else {
//             addToFavorites(movie)
//         }
//     }

//     return (
//         <div className="relative rounded-lg overflow-hidden bg-[#1a1a1a] flex flex-col transition-transform hover:-translate-y-1 duration-200">

//             <div className="relative aspect-2/3 w-full group">

//                 <img
//                     src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                     alt={movie.title}
//                     className="w-full h-full object-cover"
//                 />

                
//                 <button
//                     onClick={onFavoriteClick}
//                     className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg transition
//                     ${favorite ? "text-[#ff4757] bg-black/80" : "text-white bg-black/50"}
//                     hover:bg-black/80`}
//                 >
//                     🤍
//                 </button>

//             </div>

//             <div className="p-4 flex flex-col gap-2 flex-1">

//                 <h3 className="text-white text-base font-medium">
//                     {movie.title}
//                 </h3>

//                 <p className="text-[#999] text-sm">
//                     {movie.release_date?.split("-")[0]}
//                 </p>

//             </div>
//         </div>
//     )
// }

// export default MovieCard
import { useMovieContext } from "../context/MovieContext"

function MovieCard({movie}) {

    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()

    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()

        if (favorite) {
            removeFromFavorites(movie.id)
        } else {
            addToFavorites(movie)
        }
    }

    return (
        <div className="relative rounded-xl overflow-hidden bg-[#1a1a1a] transition hover:-translate-y-2 duration-300">

            {/* Poster */}
            <div className="relative w-full h-[450px] group">

                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />

                {/* Favorite Button */}
                <button
                    onClick={onFavoriteClick}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 transition"
                >

                    <svg
                        className={`w-7 h-7 transition ${
                            favorite ? "fill-red-500 stroke-red-500" : "fill-transparent stroke-white"
                        }`}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                    >
                        <path d="M12 21s-6-4.35-9-9a5.5 5.5 0 0 1 9-7 5.5 5.5 0 0 1 9 7c-3 4.65-9 9-9 9z"/>
                    </svg>

                </button>

            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="text-white font-medium">
                    {movie.title}
                </h3>

                <p className="text-gray-400 text-sm">
                    {movie.release_date?.split("-")[0]}
                </p>
            </div>

        </div>
    )
}

export default MovieCard