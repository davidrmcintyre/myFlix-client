# Road Movie Cinephiles
This is a React application that allows users to browse and interact with a collection of movies. Users can search for movies, view movie details, add movies to their favorites, and discover similar movies.

## Features
User authentication: Users can sign up, log in, and log out of the application.
Movie browsing: Users can view a list of movies and search for specific movies by title.
Movie details: Users can click on a movie to view its details, including the movie's title, director, description, year, and genres.
Favorite movies: Authenticated users can add movies to their list of favorite movies.
Similar movies: When viewing the details of a movie, users can see a list of similar movies based on the genre of the current movie.

## Usage

[Visit the site here](https://roadmoviecinephiles.netlify.app/)

## Dependencies
The following dependencies are used in this application:

React: JavaScript library for building user interfaces.
React Router: Library for handling routing in React applications.
React Bootstrap: Bootstrap components built with React.
Axios: Promise-based HTTP client for making API requests.
API Integration
This application integrates with a movie API to fetch movie data. The base URL of the API is https://road-movie-cinephiles.herokuapp.com. The following API endpoints are used:

GET /movies: Fetches a list of movies.
POST /users/:username/movies/:movieId: Adds a movie to a user's favorite movies.
DELETE /users/:username/movies/:movieId: Removes a movie from a user's favorite movies.
Please note that you need a valid API token to access the movie data. The token is sent in the Authorization header of each API request.

## File Structure
The source code is organized into several components:

MainView: The main entry point of the application that handles user authentication, movie fetching, and routing.
MovieCard: Renders a card displaying basic information about a movie.
MovieView: Renders detailed information about a movie, including the ability to add the movie to favorites.
LoginView: Displays a login form and handles user login.
SignupView: Displays a signup form for new users.
NavigationBar: Renders the navigation bar at the top of the application.
ProfileView: Displays user profile information, including the list of favorite movies and the ability to remove movies from favorites.
MoviesList: Renders a list of movies and handles movie searching.
MovieDetails: Displays detailed information about a movie, including similar movies.


## License
This project is licensed under the MIT License.