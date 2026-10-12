import { createContext, useContext } from "react"

// Kept apart from the provider component so that file only exports a
// component (required for React Fast Refresh).
export const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)
