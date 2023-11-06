import React, { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../utils/apiRequest.js';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      const resp = await apiRequest.post('/auth/signin', {
        username,
        password,
      });

      localStorage.setItem('currentUser', JSON.stringify(resp.data));
      navigate('/');
    } catch (err) {
      setTimeout(() => {
        setError(err.response.data.message);
        setIsLoading(false);
      }, 600);
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit} method='post'>
        <h1>Sign in</h1>
        <label htmlFor=''>Username</label>
        <input
          name='username'
          type='text'
          placeholder='johndoe'
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor=''>Password</label>
        <input
          name='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='submit'
          className={isLoading ? 'loading' : ''}
          disabled={isLoading}
        >
          {isLoading ? 'Signing you in...' : 'Sign In'}
        </button>
        {error && error}
      </form>
    </div>
  );
}

export default Login;
