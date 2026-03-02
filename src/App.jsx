import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './context/MovieContext'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

function App() {
  return (
    <MovieProvider>

      <div className="min-h-screen flex flex-col bg-[#242424] text-white font-sans">

        <NavBar />

        <main className="flex-1 p-6 w-full box-border">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>

      </div>

    </MovieProvider>
  )
}

export default App