import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

const FALLBACK_POSTER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' viewBox='0 0 500 750'%3E%3Crect width='100%25' height='100%25' fill='%231f1f1f'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='28' font-family='Arial, sans-serif'%3ENo Poster%3C/text%3E%3C/svg%3E";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : FALLBACK_POSTER;

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterSrc} alt={movie.title} loading="lazy" />
        <div className="movie-overlay">
          <button
            type="button"
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
            aria-pressed={favorite}
            aria-label={
              favorite
                ? `Remove ${movie.title} from favorites`
                : `Add ${movie.title} to favorites`
            }
          >
            &#10084;
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date || "Release date unavailable"}</p>
      </div>
    </div>
  );
}

export default MovieCard;
