import React, { useState } from 'react';
import upload from '../../utils/upload.js';
import { useNavigate } from 'react-router-dom';

import apiRequest from '../../utils/apiRequest.js';
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    img: '',
    country: '',
    isSeller: false,
    desc: '',
    phone: '',
  });

  const handleOnChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleOnChangeSeller = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        isSeller: e.target.checked,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    if (!url || url.length <= 0) {
      console.log('Error uploading file.');
      return;
    }

    try {
      await apiRequest.post(`/registration`, {
        ...user,
        img: url,
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='register'>
      <form onSubmit={handleSubmit}>
        <div className='left'>
          <h1>Create a new account</h1>
          <label htmlFor=''>Username</label>
          <input
            name='username'
            type='text'
            placeholder='johndoe'
            onChange={handleOnChange}
          />
          <label htmlFor=''>Email</label>
          <input
            name='email'
            type='email'
            placeholder='email'
            onChange={handleOnChange}
          />
          <label htmlFor=''>Password</label>
          <input name='password' type='password' onChange={handleOnChange} />
          <label htmlFor=''>Profile Picture</label>
          <input type='file' onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor=''>Country</label>
          <input
            name='country'
            type='text'
            placeholder='Usa'
            onChange={handleOnChange}
          />
          <button type='submit'>Register</button>
        </div>
        <div className='right'>
          <h1>I want to become a seller</h1>
          <div className='toggle'>
            <label htmlFor=''>Activate the seller account</label>
            <label className='switch'>
              <input type='checkbox' onChange={handleOnChangeSeller} />
              <span className='slider round'></span>
            </label>
          </div>
          <label htmlFor=''>Phone Number</label>
          <input
            name='phone'
            type='text'
            placeholder='+1 234 567 89'
            onChange={handleOnChange}
          />
          <label htmlFor=''>Description</label>
          <textarea
            placeholder='A short description of yourself'
            name='desc'
            id=''
            cols='30'
            rows='10'
            onChange={handleOnChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Register;
