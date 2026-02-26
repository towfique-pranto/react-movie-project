import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(Array.isArray(popularMovies) ? popularMovies : []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    if (loading) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const searchResults = await searchMovies(searchTerm);
      setMovies(Array.isArray(searchResults) ? searchResults : []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const showEmptyState = !loading && !error && movies.length === 0;

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search for movies"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <div className="status-message error-message" role="alert" aria-live="assertive">
          {error}
        </div>
      )}

      {loading && (
        <div className="status-message loading" aria-live="polite">
          Loading...
        </div>
      )}

      {showEmptyState && (
        <div className="status-message empty-message" aria-live="polite">
          {hasSearched
            ? "No movies found for your search."
            : "No movies available right now."}
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="movies-grid">
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
