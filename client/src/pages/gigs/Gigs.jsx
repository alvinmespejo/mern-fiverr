import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import GigCard from '../../components/gigCard/GigCard';
import { gigs } from '../../data';
import apiRequest from '../../utils/apiRequest.js';
import { useLocation } from 'react-router-dom';

import './Gigs.scss';

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState('sales');
  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  const { search } = useLocation();

  const { isLoading, error, data, refetch, isFetching } = useQuery({
    queryKey: ['gigs'],
    queryFn: () =>
      apiRequest
        .get(
          `/gigs${search}&min=${minPriceRef.current.value}&max=${maxPriceRef.current.value}&sort=${sort}`
        )
        .then((resp) => {
          return resp.data.gigs;
        })
        .catch((err) => {
          throw new Error('Error fetching gigs.');
        }),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const filterPrice = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [sort]);

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
            <input
              type='text'
              placeholder='min'
              name='min'
              id='min'
              ref={minPriceRef}
            />
            <input
              type='text'
              placeholder='max'
              name='max'
              id='max'
              ref={maxPriceRef}
            />
            <button type='submit' onClick={filterPrice}>
              Apply
            </button>
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
          {isLoading || isFetching
            ? 'Loading...'
            : error
            ? 'Something went wrong'
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
