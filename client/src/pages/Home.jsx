import MovieCard from "../components/MovieCard"
import { useState } from "react";
import "../css/Home.css";

function Home() {
    const [searchTerm, setSearchTerm] = useState("");


    const movies = [
        { id: 1, title: "The Matrix", year: 1999, url: "https://upload.wikimedia.org/wikipedia/en/5/5d/The_Matrix_poster.jpg" },
        { id: 2, title: "The Matrix Reloaded", year: 2003, url: "https://upload.wikimedia.org/wikipedia/en/5/5d/The_Matrix_poster.jpg" },
        { id: 3, title: "The Matrix Revolutions", year: 2003, url: "https://upload.wikimedia.org/wikipedia/en/5/5d/The_Matrix_poster.jpg" },
    ]

    const handleSearch = (e) => {
        e.preventDefault();
        alert(searchTerm);
    }
    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies"
                    value={searchTerm}
                    className="search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            <div className="movies-grid">
                {movies.map((movie) => {
                    return <MovieCard movie={movie} key={movie.id} />;
                })}
            </div>
        </div>
    )
}

export default Home