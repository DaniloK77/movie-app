import { useState } from "react"
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom"
import { useMovieContext } from "../context/useMovieContext"
import { CloseIcon, FilmIcon, SearchIcon } from "./icons"

// Search lives in the navbar so it works from every page. Submitting goes to
// /?q=..., which keeps searches linkable and the back button working.
function SearchForm({ initialValue }) {
    const navigate = useNavigate()
    const [value, setValue] = useState(initialValue)

    function handleSubmit(e) {
        e.preventDefault()
        const query = value.trim()
        navigate(query ? `/?q=${encodeURIComponent(query)}` : "/")
    }

    return (
        <form role="search" onSubmit={handleSubmit} className="relative w-full">
            <label htmlFor="movie-search" className="sr-only">
                Search movies
            </label>
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4.5
                -translate-y-1/2 text-muted" />
            <input
                id="movie-search"
                type="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search movies…"
                autoComplete="off"
                className="w-full rounded-full border border-line bg-surface py-2.5 pl-11 pr-10
                    text-sm text-white placeholder:text-muted transition
                    focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30
                    [&::-webkit-search-cancel-button]:hidden"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => setValue("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 grid size-6 -translate-y-1/2
                        place-items-center rounded-full text-muted transition hover:text-white"
                >
                    <CloseIcon className="size-4" />
                </button>
            )}
        </form>
    )
}

function NavBar() {
    const { favorites } = useMovieContext()
    const [params] = useSearchParams()
    const query = params.get("q") ?? ""

    const linkClasses = ({ isActive }) =>
        `inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition sm:px-4 ${
            isActive ? "bg-white/10 text-white" : "text-muted hover:text-white"
        }`

    return (
        <header className="sticky top-0 z-30 border-b border-line bg-ink/80 backdrop-blur-xl">

            <nav
                aria-label="Main"
                className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-6
                    px-4 py-3 sm:px-6 lg:px-8"
            >

                <Link
                    to="/"
                    className="flex items-center gap-2.5 font-display text-lg font-bold"
                >
                    <span className="grid size-8 place-items-center rounded-lg bg-accent">
                        <FilmIcon className="size-4.5 text-white" />
                    </span>
                    Movie App
                </Link>

                <div className="order-last w-full md:order-none md:max-w-md md:flex-1">
                    {/* key resets the input when the URL's query changes */}
                    <SearchForm key={query} initialValue={query} />
                </div>

                <div className="ml-auto flex items-center gap-1">
                    <NavLink to="/" end className={linkClasses}>
                        Home
                    </NavLink>
                    <NavLink to="/favorites" className={linkClasses}>
                        Favorites
                        {favorites.length > 0 && (
                            <span
                                aria-label={`${favorites.length} saved`}
                                className="grid min-w-5 place-items-center rounded-full bg-accent
                                    px-1.5 text-xs font-semibold leading-5 text-white"
                            >
                                {favorites.length}
                            </span>
                        )}
                    </NavLink>
                </div>

            </nav>

        </header>
    )
}

export default NavBar
