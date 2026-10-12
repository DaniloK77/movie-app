import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Query params the browser is allowed to forward to SerpApi. Everything else
// (engine, api_key, output, ...) is set here, on the server side. Add a name
// here when the app starts using another SerpApi parameter.
const ALLOWED_PARAMS = ['q']

// Forwards /api/movies?... to SerpApi and injects the private key, so the key
// never ends up in the browser bundle.
function serpApiProxy(apiKey) {
  return {
    '/api/movies': {
      target: 'https://serpapi.com',
      changeOrigin: true,
      rewrite: (path) => {
        const incoming = new URL(path, 'http://localhost').searchParams
        const outgoing = new URLSearchParams({
          engine: 'google_play_movies',
          api_key: apiKey,
        })
        for (const name of ALLOWED_PARAMS) {
          if (incoming.has(name)) outgoing.set(name, incoming.get(name))
        }
        return `/search.json?${outgoing}`
      },
    },
  }
}

export default defineConfig(({ mode }) => {
  // Empty prefix: read SERPAPI_KEY without exposing it to client code
  // (only VITE_* variables are ever bundled).
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.SERPAPI_KEY

  if (!apiKey) {
    console.warn(
      '\n[movie-app] SERPAPI_KEY is missing. Add it to .env (see .env.example).\n'
    )
  }

  const proxy = serpApiProxy(apiKey ?? '')

  return {
    plugins: [react(), tailwindcss()],
    server: { proxy },
    preview: { proxy },
  }
})
