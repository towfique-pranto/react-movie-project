import "../css/MovieCard.css";

function MovieCard({ movie }) {
    function favoriteClick() {
        alert("Clicked")
    }
    return (
        <div className="movie-card">
            <div className='movie-poster'>
                <img src={movie.url} alt={movie.title} />
                <div className="movie-overlay">
                    <button className="favorite-btn" onClick={favoriteClick}>&#10084;</button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
            </div>
        </div>
    );
}

export default MovieCard;