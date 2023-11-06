import React, { useState } from 'react';
import './Featured.scss';
import { useNavigate } from 'react-router-dom';

const Featured = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    navigate(`/gigs?search=${search}`);
  };

  const handleEnterKeyListener = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <div className='featured'>
      <div className='container'>
        <div className='left'>
          <h1>
            Find the perfect <i>freelance</i> services for your business
          </h1>
          <div className='search'>
            <div className='search-input'>
              <img src='./assets/search.png' alt='Search' />
              <input
                type='text'
                name='search'
                id='search'
                placeholder='Try building a mobile app'
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleEnterKeyListener}
              />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className='popular'>
            <span>Popular:</span>
            <button>Web Design</button>
            <button>Wordpress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className='right'>
          <img src='./assets/man.png' alt='' />
        </div>
      </div>
    </div>
  );
};

export default Featured;
