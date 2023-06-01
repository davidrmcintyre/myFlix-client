import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch('https://road-movie-cinephiles.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        alert('Signup successful');
        window.location.reload();
      } else {
        alert('Signup failed');
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className='mt-2 w-50 mx-auto'>
      <Form.Group controlID='header'>
        <Form.Label>Please Sign Up</Form.Label>
      </Form.Group>
      <Form.Group controlId='username'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          placeholder='Username must contain at least six charatcers'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
        />
      </Form.Group>
      <Form.Group controlId='password'>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          placeholder='A password is required'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId='email'>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter a valid email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId='birthday'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type='date'
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant='primary' type='submit' className='mt-1'>Sign Up</Button>
    </Form>
  );
};
