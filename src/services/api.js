// Google Play Movies data via SerpApi (https://serpapi.com/google-play-movies).
//
// The browser never talks to SerpApi directly: requests go to /api/movies,
// where the dev/preview server adds the private API key (see vite.config.js).

const ENDPOINT = '/api/movies'

// SerpApi caches identical searches for an hour, so there is no point in
// asking again sooner - and every search counts against the plan's quota.
const CACHE_TTL_MS = 60 * 60 * 1000
const CACHE_PREFIX = 'serp:'

const SEEN_KEY = 'seen-movies'
const SEEN_LIMIT = 300

const NO_RESULTS = /hasn't returned any results/i

class ApiError extends Error {
    constructor(message, status = 0) {
        super(message)
        this.name = 'ApiError'
        this.status = status
    }
}

// ---------------------------------------------------------------- storage --

const memory = new Map()

function readStorage(key) {
    try {
        const raw = sessionStorage.getItem(key)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

function writeStorage(key, value) {
    try {
        sessionStorage.setItem(key, JSON.stringify(value))
    } catch {
        // Storage full or unavailable - the in-memory cache still works.
    }
}

function readCache(key) {
    const entry = memory.get(key) ?? readStorage(CACHE_PREFIX + key)
    if (!entry || Date.now() - entry.time > CACHE_TTL_MS) return null
    memory.set(key, entry)
    return entry.data
}

function writeCache(key, data) {
    const entry = { time: Date.now(), data }
    memory.set(key, entry)
    writeStorage(CACHE_PREFIX + key, entry)
}

// Movies we have shown at some point, so the detail page can open them
// without another API call (the API has no "get movie by id" in this engine).
function rememberMovies(movies) {
    const seen = readStorage(SEEN_KEY) ?? {}
    for (const movie of movies) seen[movie.id] = movie

    const ids = Object.keys(seen)
    for (const id of ids.slice(0, Math.max(0, ids.length - SEEN_LIMIT))) {
        delete seen[id]
    }
    writeStorage(SEEN_KEY, seen)
}

export function findSeenMovie(id) {
    return readStorage(SEEN_KEY)?.[id] ?? null
}

// ---------------------------------------------------------------- network --

function messageFor(status, detail) {
    if (status === 401 || status === 403) {
        return 'The SerpApi key is missing or invalid. Check SERPAPI_KEY in .env and restart the dev server.'
    }
    if (status === 429) {
        return 'The SerpApi search limit has been reached. Try again later.'
    }
    return detail || 'Something went wrong while loading movies.'
}

async function fetchJson(params) {
    let response
    try {
        response = await fetch(`${ENDPOINT}?${new URLSearchParams(params)}`)
    } catch {
        throw new ApiError('Could not reach the server. Check your connection.')
    }

    let body = null
    try {
        body = await response.json()
    } catch {
        // Not JSON (e.g. the proxy is not running and we got index.html).
    }

    if (body?.error && NO_RESULTS.test(body.error)) return { organic_results: [] }
    if (!response.ok || body?.error) {
        throw new ApiError(messageFor(response.status, body?.error), response.status)
    }
    if (!body) {
        throw new ApiError('Unexpected response. Is the /api/movies proxy running?', response.status)
    }
    return body
}

// One request per distinct query at a time, and a cache behind it. Callers
// that unmount (React StrictMode does this on purpose) only stop listening;
// the request itself finishes and fills the cache instead of being wasted.
const inflight = new Map()

function load(params, normalize) {
    const key = new URLSearchParams(params).toString() || 'browse'

    const cached = readCache(key)
    if (cached) return Promise.resolve(cached)

    if (!inflight.has(key)) {
        const request = fetchJson(params)
            .then(normalize)
            .then((data) => {
                writeCache(key, data)
                return data
            })
            .finally(() => inflight.delete(key))
        inflight.set(key, request)
    }
    return inflight.get(key)
}

function withSignal(promise, signal) {
    return new Promise((resolve, reject) => {
        const abort = () => reject(new DOMException('Aborted', 'AbortError'))
        if (signal?.aborted) return abort()
        signal?.addEventListener('abort', abort, { once: true })
        promise.then(resolve, reject)
    })
}

// ----------------------------------------------------------- normalization --

// Search results also contain TV shows and episodes; only movies have a
// /store/movies/ link and no season_id.
const isMovie = (item) =>
    Boolean(item?.product_id) &&
    !item.season_id &&
    String(item.link ?? '').includes('/store/movies/')

function normalizeMovie(item) {
    return {
        id: item.product_id,
        title: item.title,
        link: item.link,
        thumbnail: item.thumbnail,
        rating: item.rating > 0 ? item.rating : null, // 0 means "not rated"
        maturityRating: item.maturity_rating ?? null,
        category: item.category ?? null,
        price: item.price ?? null,
        description: item.description ?? '',
        trailer: item.video ?? null,
    }
}

function uniqueMovies(items) {
    const byId = new Map()
    for (const item of items) {
        if (isMovie(item) && !byId.has(item.product_id)) {
            byId.set(item.product_id, normalizeMovie(item))
        }
    }
    return [...byId.values()]
}

function normalizeSections(data) {
    const sections = (data.organic_results ?? [])
        .map((section, index) => ({
            id: `${index}-${section.title}`,
            title: section.title,
            subtitle: section.subtitle ?? null,
            items: uniqueMovies(section.items ?? []),
        }))
        .filter((section) => section.items.length > 0)

    rememberMovies(sections.flatMap((section) => section.items))
    return sections
}

function normalizeSearch(data) {
    const movies = uniqueMovies(
        (data.organic_results ?? []).flatMap((section) => section.items ?? [])
    )
    rememberMovies(movies)
    return movies
}

// ------------------------------------------------------------- public API --

/** Store front: rows such as "New to buy or rent" and "Top selling". */
export const getBrowseSections = (signal) =>
    withSignal(load({}, normalizeSections), signal)

/** Movies matching a free-text query. */
export const searchMovies = (query, signal) =>
    withSignal(load({ q: query.trim() }, normalizeSearch), signal)

/**
 * Thumbnails come in 256px; Google's image host accepts a width suffix, so we
 * ask for what the layout actually needs (it caps at the original size).
 */
export function posterUrl(movie, width = 400) {
    if (!movie?.thumbnail) return ''
    return `${movie.thumbnail.replace(/=[^/=]*$/, '')}=w${width}-rw`
}
