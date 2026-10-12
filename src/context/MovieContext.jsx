import { useState, useEffect, useMemo, useCallback } from "react"
import { MovieContext } from "./useMovieContext"

const STORAGE_KEY = "favorites.v2"
// Favorites saved by the old TMDB version of the app (different shape).
const LEGACY_STORAGE_KEY = "favorites"

function loadFavorites() {
    try {
        localStorage.removeItem(LEGACY_STORAGE_KEY)

        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
        return Array.isArray(stored)
            ? stored.filter((movie) => movie && typeof movie.id === "string")
            : []
    } catch {
        return []
    }
}

export const MovieProvider = ({children}) => {
    // Read synchronously on first render. Loading in an effect would race
    // with the save effect below and wipe the stored list.
    const [favorites, setFavorites] = useState(loadFavorites)

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
        } catch {
            // Storage unavailable or full - favorites just won't persist.
        }
    }, [favorites])

    const toggleFavorite = useCallback((movie) => {
        setFavorites(prev =>
            prev.some(m => m.id === movie.id)
                ? prev.filter(m => m.id !== movie.id)
                : [...prev, movie]
        )
    }, [])

    const isFavorite = useCallback(
        (movieId) => favorites.some(movie => movie.id === movieId),
        [favorites]
    )

    const value = useMemo(() => ({
        favorites,
        toggleFavorite,
        isFavorite
    }), [favorites, toggleFavorite, isFavorite])

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}
