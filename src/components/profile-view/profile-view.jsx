import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ProfileView = ({ user, token, movies, onLoggedOut, onRemoveFavorite }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  useEffect(() => {
    fetch(`https://road-movie-cinephiles.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setUsername(data.Username);
        setPassword(data.Password);
        setEmail(data.Email);
        setBirthday(data.Birthday);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
      });
  }, [user, token]);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Make a PUT request to update the user's information
    fetch(`https://road-movie-cinephiles.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the user information state variables if needed
        console.log('User information updated:', data);
      })
      .catch((error) => {
        console.log('Error updating user information:', error);
      });
  };
  
  const handleDeregister = () => {
    // Make a DELETE request to deregister the user
    fetch(`https://road-movie-cinephiles.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 204) {
          // User deregistration successful
          onLoggedOut();
          console.log('User deregistered successfully.');
        } else {
          console.log('User deregistration failed.');
        }
      })
      .catch((error) => {
        console.log('Error deregistering user:', error);
      });
  };

  if (!user || loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className='justify-content-end'>
        <Col>
          <Link to='/' className='btn btn-secondary m-1'>
            Back
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Profile</h2>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId='username'>
              <Form.Label>Username:</Form.Label>
              <Form.Control type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password:</Form.Label>
              <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email:</Form.Label>
              <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='birthday'>
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} />
            </Form.Group>

            <Button variant='primary' type='submit' className='m-1'>
              Update
            </Button>
          </Form>

          <p>Email: {userData.Email}</p>
          <p>Favorite Movies:</p>
          <ul>
            {user.FavoriteMovies.length > 0 ? (
              user.FavoriteMovies.map((movieId) => {
                const movie = movies.find((m) => m._id === movieId);
                return (
                  <li key={movie._id}>
                    {movie ? (
                      <>
                        {movie.Title}
                        <Button
                          variant='danger'
                          size='sm'
                          className='ml-2'
                          onClick={() => onRemoveFavorite(movieId)}
                        >
                          Remove
                        </Button>
                      </>
                    ) : null}
                  </li>
                );
              })
            ) : (
              <li>No favorite movies selected</li>
            )}
          </ul>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col>
          <Button variant='danger' className='mt-2' onClick={handleDeregister}>
            Deregister
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
