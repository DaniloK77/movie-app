import MovieCard from "../components/MovieCard"
import { useState,useEffect } from "react"
import { SearchMovies,getPopularMovies } from "../services/api"

export function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [movies,setMovies]=useState([])
    const [error,SetError]=useState(null)
    const [loading,setLoading]=useState(true)

 useEffect(()=>{
    const loadPopularMovies = async()=>{
        try{
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies)
            SetError(null)
        }catch(err){
            console.log(err)
            SetError("failed to load the movies")
        }
        finally{
            setLoading(false)
        }
    }

    loadPopularMovies();

},[])
    

    const HandleSearch = async(e) => {
    e.preventDefault()

    if(!searchQuery.trim()) return

    try{
        setLoading(true)

        const searchResults = await SearchMovies(searchQuery)
        setMovies(searchResults)

        SetError(null)

    }catch(err){
        console.log(err)
        SetError("Failed to search movies....")

    }finally{
        setLoading(false)
    }
}

    return (
        <div className="w-full py-10 box-border">

            
            <form
                onSubmit={HandleSearch}
                className="max-w-175 mx-auto mb-12 flex gap-3 px-6 w-full"
            >
                <input
                    type="text"
                    placeholder="Search for Movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 p-4 rounded-xl 
                    bg-[#1a1a1a] text-white border border-white/10 
                    focus:outline-none focus:ring-2 focus:ring-red-600 
                    transition shadow-lg"
                />

                <button
                    type="submit"
                    className="px-8 py-4 bg-[#e50914] 
                    text-white rounded-xl font-semibold 
                    transition hover:bg-[#f40612] 
                    shadow-lg hover:shadow-red-500/30"
                >
                    Search
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}

            {loading ? <div className="loading">Loading</div> : <div className="grid 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 
                xl:grid-cols-4 
                gap-8 
                px-6 
                max-w-350 
                mx-auto">

                {movies.map(
                    (movie) =>
                        movie.title
                            .toLowerCase()
                            .startsWith(searchQuery.toLowerCase()) && (
                            <MovieCard movie={movie} key={movie.id} />
                        )
                )}
            </div> }
            

        </div>
    )
}

export default Home