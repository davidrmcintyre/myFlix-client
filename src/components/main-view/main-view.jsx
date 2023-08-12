import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (!token) return;

    // Fetch movies from the API when the token changes
    fetch('https://road-movie-cinephiles.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the API response and update the movies state
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Director: {
              firstName: movie.Director.firstName,
              lastName: movie.Director.lastName
            },
            Description: movie.Description,
            Year: movie.Year,
            Genres: movie.Genres.map((genre) => genre.Name),
            Featured: movie.Featured
          };
        });

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.log('Error fetching movies:', error);
      });
  }, [token]);

  const handleLogin = (loggedInUser, loggedInToken) => {
    // Update the user and token states when the user logs in
    setUser(loggedInUser);
    setToken(loggedInToken);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    localStorage.setItem('token', loggedInToken);
  };

  const handleLogout = () => {
    // Clear the user and token states when the user logs out
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Handles the search function
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredMovies([]);
    } else {
      // Filter movies based on the search query and update the filteredMovies state
      const filtered = movies.filter((movie) =>
        movie.Title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  const handleAddToFavorites = (movieId) => {
    // Create an updated user object with the new movie added to the favorite movies array
    const updatedUser = {
      ...user,
      FavoriteMovies: [...user.FavoriteMovies, movieId]
    };

    // Make a PUT request to add the movie to the user's favorite movies
    fetch(`https://road-movie-cinephiles.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Error adding movie to favorites');
        }
      })
      .then((updatedUser) => {
        // Update the user information state variables if needed
        console.log('User information updated:', updatedUser);
        setUser(updatedUser);
      })
      .catch((error) => {
        console.log('Error updating user information:', error);
      });
  };

  const handleRemoveFavorite = (movieId) => {
    // Make a DELETE request to remove the specified movie from the user's favorite movies
    fetch(`https://road-movie-cinephiles.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          // Update the user state by removing the movie from the favorite movies array
          setUser((prevUser) => ({
            ...prevUser,
            FavoriteMovies: prevUser.FavoriteMovies.filter((id) => id !== movieId)
          }));
          console.log('Movie removed from favorites.');
        } else {
          console.log('Error removing movie from favorites.');
        }
      })
      .catch((error) => {
        console.log('Error removing movie from favorites:', error);
      });
  };

  return (
    <BrowserRouter>
      <div className="container-flud">
        <NavigationBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path='/'
          element={
            user ? (
              <MoviesList
                movies={movies}
                searchQuery={searchQuery}
                onSearch={handleSearch}
                filteredMovies={filteredMovies}
              />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route path='/login' element={<LoginView onLoggedIn={handleLogin} />} />
        <Route path='/signup' element={<SignupView />} />
        <Route
          path='/profile'
          element={
            <ProfileView
              user={user}
              token={token}
              movies={movies}
              onLoggedOut={handleLogout}
              onRemoveFavorite={handleRemoveFavorite}
            />
          }
        />
        <Route
          path='/movie/:id'
          element={<MovieDetails movies={movies} onAddToFavorites={handleAddToFavorites} />}
        />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

const MoviesList = ({ movies, searchQuery, onSearch, filteredMovies }) => {
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  const displayMovies = searchQuery === '' ? movies : filteredMovies;

  return (
    <div className='rounded m-1'>
      <input
        type="text"
        value={searchQuery}
        onChange={onSearch}
        placeholder="Search movies..."
      />
      {displayMovies.length > 0 ? (
        <Row>
          {displayMovies.map((movie) => (
            <Col xs={12} sm={6} md={4} lg={3} key={movie._id}>
              <Link to={`/movie/${movie._id}`} className="text-decoration-none">
                <MovieCard movie={movie} />
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <div>No movies found with this name.</div>
      )}
    </div>
  );
};

const MovieDetails = ({ movies, onAddToFavorites }) => {
  const { id } = useParams();
  const movie = movies.find((movie) => movie._id === id);

  if (!movie) {
    return null;
  }

  const similarMovies = movies.filter(
    (m) => m.Genres.includes(movie.Genres[0]) && m._id !== movie._id
  );

  return (
    <>
      <Row className='m-3 justify-content-end'>
        <Col>
          <Link to='/' className='btn btn-secondary'>
            Back
          </Link>
        </Col>
      </Row>
      <Row>
        <Col lg={9} md={7} sm={5} className='mx-auto'>
          <MovieView movie={movie} onAddToFavorites={onAddToFavorites} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h2>Similar Movies</h2>
          {similarMovies.length > 0 ? (
            <Row>
              {similarMovies.map((m) => (
                <Col xs={12} sm={6} md={4} lg={3} key={m._id} className='mx-auto'>
                  <Link to={`/movie/${m._id}`} className='text-decoration-none'>
                    <MovieCard movie={m} />
                  </Link>
                </Col>
              ))}
            </Row>
          ) : (
            <span>No similar movies available</span>
          )}
        </Col>
      </Row>
    </>
  );
};
