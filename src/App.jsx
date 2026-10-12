import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { MovieProvider } from './context/MovieContext'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { EmptyState } from './components/States'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import MovieDetail from './pages/MovieDetail'

// BrowserRouter doesn't reset scroll on navigation by itself.
function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])

  return null
}

function App() {
  return (
    <MovieProvider>

      <ScrollToTop />

      <div className="flex min-h-screen flex-col bg-ink font-sans text-white">

        <NavBar />

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route
              path="*"
              element={
                <EmptyState
                  title="Page not found"
                  actionTo="/"
                  actionLabel="Go home"
                >
                  That page doesn't exist.
                </EmptyState>
              }
            />
          </Routes>
        </main>

        <Footer />

      </div>

    </MovieProvider>
  )
}

export default App
