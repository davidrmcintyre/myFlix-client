export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.ImagePath} alt={movie.Title} class='movie-image' />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{`${movie.Director.firstName} ${movie.Director.lastName}`}</span>
        </div>
        <div>
          <span>Year: </span>
          <span>{movie.Year}</span>
        </div>
        <div>
          <span>Genres: </span>
          {movie.Genres.map((genre) => (
            <span key={genre.Name}>
              {genre.Name}: {genre.Description}
            </span>
          ))}
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };
  