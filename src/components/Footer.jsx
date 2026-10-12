function Footer() {
    return (
        <footer className="border-t border-line py-8 text-center text-xs text-muted">
            Movie data from the Google Play Movies store, provided by{" "}
            <a
                href="https://serpapi.com/google-play-movies"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition hover:text-white"
            >
                SerpApi
            </a>
            .
        </footer>
    )
}

export default Footer
