// Here you import the PropTypes library
import PropTypes from "prop-types";

// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired, // ID of the movie (string)
    Title: PropTypes.string.isRequired, // Title of the movie (string)
    ImagePath: PropTypes.string.isRequired, // Path to the movie image (string)
    Director: PropTypes.string.isRequired, // Director's name (string)
    Description: PropTypes.string.isRequired, // Description of the movie (string)
    Year: PropTypes.number.isRequired, // Year of release (number)
    Genres: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of genres (array of strings)
    Featured: PropTypes.bool.isRequired, // Flag indicating if the movie is featured (boolean)
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired, // Event handler for when the movie is clicked (function)
};
