import { useEffect, useState } from 'react'
import { getBrowseSections, searchMovies } from '../services/api'

const LOADERS = {
    browse: (_arg, signal) => getBrowseSections(signal),
    search: (query, signal) => searchMovies(query, signal),
}

/**
 * Loads data from the movies API and tracks loading / error state.
 *
 *   const { data, error, loading, retry } = useApiQuery('search', 'batman')
 *
 * `loading` is derived from "the latest result belongs to a different
 * request", so a new query shows its loading state immediately and a slow,
 * stale response can never overwrite a newer one.
 */
export function useApiQuery(name, arg = '') {
    const [attempt, setAttempt] = useState(0)
    const [result, setResult] = useState(null)
    const requestId = `${name}|${arg}|${attempt}`

    useEffect(() => {
        const controller = new AbortController()

        LOADERS[name](arg, controller.signal)
            .then((data) => setResult({ id: requestId, data, error: null }))
            .catch((error) => {
                if (error.name === 'AbortError') return
                setResult({ id: requestId, data: null, error })
            })

        return () => controller.abort()
    }, [name, arg, requestId])

    const settled = result?.id === requestId

    return {
        data: settled ? result.data : null,
        error: settled ? result.error : null,
        loading: !settled,
        retry: () => setAttempt((count) => count + 1),
    }
}
