import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { useApiQuery } from "../hooks/useApiQuery"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import Hero from "../components/Hero"
import MovieRow from "../components/MovieRow"
import MovieCard from "../components/MovieCard"
import {
    EmptyState,
    ErrorState,
    GridSkeleton,
    HeroSkeleton,
    RowSkeleton,
} from "../components/States"

// Prefer a movie that has both a description and a trailer for the banner.
function pickFeatured(sections) {
    const movies = sections.flatMap((section) => section.items)
    return (
        movies.find((movie) => movie.description && movie.trailer) ??
        movies.find((movie) => movie.description) ??
        movies[0] ??
        null
    )
}

function Browse() {
    const { data: sections, error, loading, retry } = useApiQuery("browse")
    const featured = useMemo(() => (sections ? pickFeatured(sections) : null), [sections])

    if (error) return <ErrorState error={error} onRetry={retry} />

    if (loading) {
        return (
            <div className="space-y-12">
                <HeroSkeleton />
                <RowSkeleton />
                <RowSkeleton />
            </div>
        )
    }

    if (sections.length === 0) {
        return (
            <EmptyState title="Nothing to show yet">
                The store didn't return any movies. Try again in a moment.
            </EmptyState>
        )
    }

    return (
        <div className="space-y-12">
            {featured && <Hero movie={featured} />}
            {sections.map((section) => (
                <MovieRow
                    key={section.id}
                    title={section.title}
                    subtitle={section.subtitle}
                    movies={section.items}
                />
            ))}
        </div>
    )
}

function SearchResults({ query }) {
    const { data: movies, error, loading, retry } = useApiQuery("search", query)

    return (
        <section aria-labelledby="results-heading" className="animate-fade-up">

            <h1 id="results-heading" className="font-display text-2xl font-semibold sm:text-3xl">
                Results for “{query}”
            </h1>

            <p aria-live="polite" className="mt-2 mb-8 min-h-5 text-sm text-muted">
                {movies && `${movies.length} ${movies.length === 1 ? "movie" : "movies"} found`}
            </p>

            {error && <ErrorState error={error} onRetry={retry} />}

            {loading && <GridSkeleton />}

            {movies && movies.length === 0 && (
                <EmptyState
                    title="No movies found"
                    actionTo="/"
                    actionLabel="Browse the store"
                >
                    Nothing matched “{query}”. Check the spelling or try a different title.
                </EmptyState>
            )}

            {movies && movies.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6
                    md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}

        </section>
    )
}

function Home() {
    const [params] = useSearchParams()
    const query = params.get("q")?.trim() ?? ""

    useDocumentTitle(query ? `“${query}”` : "")

    return query ? <SearchResults query={query} /> : <Browse />
}

export default Home
