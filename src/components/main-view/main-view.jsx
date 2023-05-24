import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch('https://road-movie-cinephiles.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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

  if (!user) {
    return (
      <Row>
        <Col>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
        </Col>
        <Col>
          <SignupView />
        </Col>
      </Row>
    );
  }

  if (selectedMovie) {
    const similarMovies = movies.filter(
      (movie) =>
        movie.Genres.includes(selectedMovie.Genres[0]) && movie._id !== selectedMovie._id
    );

    return (
      <>
        <Row>
          <Col>
            <button className='btn btn-secondary m-3'
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </button>
          </Col>
        </Row>
        <Row>
          <Col lg={9} md={7} sm={5} className='mx-auto'>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col >
            <h2>Similar Movies</h2>
            {similarMovies.length > 0 ? (
              <Row>
                {similarMovies.map((movie) => (
                  <Col xs={12} sm={6} md={4} lg={3} key={movie._id} className='mx-auto'>
                    <MovieCard
                      movie={movie}
                      onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                      }}
                    />
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
  }

  if (movies.length === 0) {
    return (
      <>
        <Row>
          <Col>
            <button className='btn btn-secondary m-3'
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </button>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>The list is empty!</div>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <Row>
        <Col>
          <button className='btn btn-secondary m-3'
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </button>
        </Col>
      </Row>
      <Row>
        {movies.map((movie) => (
          <Col xs={12} sm={6} md={4} lg={3} key={movie._id}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};
