import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav className="bg-black px-8 py-4 flex justify-between items-center shadow-md flex-wrap">

          
            <div className="text-2xl font-bold text-white">
                <Link to="/">Movie App</Link>
            </div>

            
            <div className="flex gap-8 items-center flex-wrap">
                <Link
                    to="/"
                    className="text-white px-4 py-2 rounded transition hover:bg-white/10 text-base"
                >
                    Home
                </Link>

                <Link
                    to="/favorites"
                    className="text-white px-4 py-2 rounded transition hover:bg-white/10 text-base"
                >
                    Favorites
                </Link>
            </div>
        </nav>
    )
}

export default NavBar