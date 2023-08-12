import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

export const NavigationBar = ({ user, onLogout, movies }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleLogout = () => {
    onLogout();
    navigate('/login');

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

  return (
    <Container fluid>
      <Navbar bg='dark' variant='dark' expand='lg' fluid>
      <Navbar.Brand as={Link} to='/' className='p-2'>
        Road Movie Cinephiles
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='navbar-nav' />
      <Navbar.Collapse id='navbar-nav'>
        <Nav className='ml-auto'>
          {user ? (
            <>
              <Nav.Link as={Link} to='/'>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to='/profile'>
                Profile
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to='/login'>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to='/signup'>
                Sign Up
              </Nav.Link>
              <input
              type='text'
              placeholder='Search movies...'
              value={searchQuery}
              onChange={handleSearch}
            />
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </Container>
  );
};
