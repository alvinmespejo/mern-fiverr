import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import apiRequest from '../../utils/apiRequest.js';
import './GigCard.scss';

const GigCard = ({ item }) => {
  // const { isLoading, error, data } = useQuery({
  //   queryKey: [`user/${item.userId}`],
  //   queryFn: () =>
  //     apiRequest
  //       .get(`/users/${item.userId._id.toString()}`)
  //       .then((resp) => {
  //         return resp.data.user;
  //       })
  //       .catch(() => {
  //         throw new Error('Error fetching gigs.');
  //       }),
  // });

  return (
    <Link to={`/gigs/${item._id.toString()}`} className='link'>
      <div className='gig-card'>
        <img src={item.cover} alt='' />
        <div className='info'>
          <div className='user'>
            {/* {isLoading ? (
              `Loading...`
            ) : error ? (
              `Something went wrong!`
            ) : (
              <>
                <img src={data.img || '/assets/noavatar.jpg'} alt='' />
                <span>{data.username}</span>
              </>
            )} */}

            <img src={item?.userId?.img || '/assets/noavatar.jpg'} alt='' />
            <span>{item?.userId?.username}</span>
          </div>
          <p>{item.shortDesc}</p>
          <div className='star'>
            {item.totalStars > 0 && <img src='/assets/star.png' alt='' />}
            <span>
              {!isNaN(Math.round(item.totalStars / item.starNumber)) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className='details'>
          <img src='/assets/heart.png' alt='heart' />
          <div className='price'>
            <span>STARTING AT</span>
            <h2>{item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
