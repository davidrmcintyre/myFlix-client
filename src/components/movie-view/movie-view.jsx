import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className='m-1'>
      <div>
        <img src={movie.ImagePath} alt={movie.Title} className='w-50' />
      </div>
      <div>
        <strong>Title: </strong>
        <span>{movie.Title}</span>
      </div>
      <div>
        <strong>Description: </strong>
        <span>{movie.Description}</span>
      </div>
      <div>
        <strong>Director: </strong>
        <span>{`${movie.Director.firstName} ${movie.Director.lastName}`}</span>
      </div>
      <div>
        <strong>Year: </strong>
        <strong>{movie.Year}</strong>
      </div>
      <div>
        <strong>Genre: </strong>
        {movie.Genres && movie.Genres.length > 0 ? (
          movie.Genres.map((genre) => (
            <span key={genre} className='genre'>
              {genre}
            </span>
          ))
        ) : (
          <span>No genres available</span>
        )}
      </div>
      <Button variant='secondary' onClick={onBackClick} className='m-1'>
        Back
      </Button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    Description: PropTypes.string.isRequired,
    Year: PropTypes.number.isRequired,
    Genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
