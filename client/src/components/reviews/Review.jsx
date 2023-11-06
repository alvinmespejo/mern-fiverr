import React from 'react';

import { useQuery } from '@tanstack/react-query';
import apiRequest from '../../utils/apiRequest';
import './Review.scss';

const Reviews = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`/review/${review._id}`],
    queryFn: () =>
      apiRequest
        .get(`/users/${review.userId}`)
        .then((resp) => {
          return resp.data.user;
        })
        .catch(() => {
          throw new Error('Error fetching gig author.');
        }),
  });

  return (
    <div className='review'>
      {isLoading ? (
        'Loading'
      ) : error ? (
        'Error occured while fetching author.'
      ) : (
        <div className='user'>
          <img
            className='pp'
            src={data?.img || '/assets/noavatar.jpg'}
            alt=''
          />
          <div className='info'>
            <span className='username'>{data?.username}</span>
            <div className='country'>
              <span>{data?.country}</span>
            </div>
          </div>
        </div>
      )}

      <div className='stars'>
        {Array(review.star)
          .fill()
          .map((item, idx) => (
            <img src='/assets/star.png' key={idx} />
          ))}
        <span>{review.star}</span>
      </div>
      <p>
        The designer took my photo for my book cover to the next level!
        Professionalism and ease of working with designer along with punctuality
        is above industry standards!! Whatever your project is, you need this
        designer!
      </p>
      <div className='helpful'>
        <span>Helpful?</span>
        <img src='/assets/like.png' alt='' />
        <span>Yes</span>
        <img src='/assets/dislike.png' alt='' />
        <span>No</span>
      </div>
    </div>
  );
};

export default Reviews;
