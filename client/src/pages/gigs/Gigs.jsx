import React, { useState } from 'react';
import GigCard from '../../components/gigCard/GigCard';

import { gigs } from '../../data';
import './Gigs.scss';

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState('sales');

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  return (
    <div className='gigs'>
      <div className='container'>
        <span className='breadcrumbs'>FIVERR &gt; GRAPHICS & DESIGN</span>
        <h1>AI Artists</h1>
        <p>
          Explore the bounderies of art and technology with Fiverr's AI artists
        </p>
        <div className='menu'>
          <div className='left'>
            <span>Budget</span>
            <input type='text' placeholder='min' name='min' id='min' />
            <input type='text' placeholder='max' name='max' id='max' />
            <button type='submit'>Apply</button>
          </div>
          <div className='right'>
            <span className='sort-by'>Sort By:</span>
            <span className='sort-type' onClick={() => setOpen(!open)}>
              {sort === 'sales' ? 'Best Selling' : 'Newest'}
            </span>
            <img
              src='./assets/down.png'
              alt=''
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className='right-menu'>
                {sort === 'sales' ? (
                  <span onClick={() => reSort('createdAt')}>Newest</span>
                ) : (
                  <span onClick={() => reSort('sales')}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='cards'>
          {gigs.map((gig) => (
            <GigCard key={gig.id} item={gig} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
