import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
  return (
    <Card style={{ margin: '20px' }}>
      <Link to={`/movie/${movie._id}`}>
        <Card.Img variant='top' src={movie.ImagePath} alt={movie.Title} />
      </Link>
      <Card.Body>
        <Card.Title style={{ color: '#333' }}>{movie.Title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
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
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
};
