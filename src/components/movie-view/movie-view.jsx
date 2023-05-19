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
          <span>{`${movie.Director.firstName} ${movie.Director.lastName}`}</span> {/* Concatenating first name and last name */}
        </div>
        <div>
          <span>Year: </span>
          <span>{movie.Year}</span>
        </div>
        <div>
          <span>Genres: </span>
          {movie.Genres && movie.Genres.length > 0 ? ( // Checking if genres array is not empty
            movie.Genres.map((genre) => (
              <span key={genre} className='genre'> {/* Assigning a unique key to each genre */}
                {genre}
              </span>
            ))
          ) : (
            <span>No genres available</span> // Displayed when genres array is empty
          )}
        </div>
        <button onClick={onBackClick}>Back</button> {/* Button to go back */}
      </div>
    );
  };
  