import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
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
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }


  if (selectedMovie) {
    const similarMovies = movies.filter(
      (movie) =>
        movie.Genres.includes(selectedMovie.Genres[0]) && movie._id !== selectedMovie._id
    );
  
    return (
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.length > 0 ? (
          <div>
            {similarMovies.map((movie) => (
              <div key={movie._id}>
                <img src={movie.ImagePath} alt={movie.Title} className='movie-image' />
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <span>No similar movies available</span>
        )}
      </>
    );
  }
  

  if (movies.length === 0) {
    return (
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
        <div>The list is empty!</div>
      </>
    );
  }

  return (
    <div>
      <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
