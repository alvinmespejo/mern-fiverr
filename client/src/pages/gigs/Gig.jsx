import React from 'react';
import Slider from 'react-slick';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import Reviews from '../../components/reviews/Reviews';

import apiRequest from '../../utils/apiRequest.js';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Gig.scss';

const Gig = () => {
  const { id } = useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'slider',
  };

  const { isLoading, error, data } = useQuery({
    queryKey: [`/gigs/${id}`],
    queryFn: () =>
      apiRequest
        .get(`/gigs/${id}`)
        .then((resp) => {
          return resp.data.gig;
        })
        .catch(() => {
          throw new Error('Error fetching gig.');
        }),
  });

  const user = data?.userId;

  return (
    <div className='gig'>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'Something went wrong'
      ) : (
        <div className='container'>
          <div className='left'>
            <span className='breadcrumbs'>FIVERR &gt; GRAPHICS & DESIGN</span>
            <h1>{data.title}</h1>
            <div className='user'>
              <img
                className='pp'
                src={user?.img || '../assets/noavatar.jpg'}
                alt=''
              />
              <span>{user.username}</span>

              {!isNaN(data.totalStars / data.starNumber) && (
                <div className='stars'>
                  {Array(Math.round(data.totalStars / data.starNumber))
                    .fill()
                    .map((item, i) => (
                      <img src='/assets/star.png' key={i} />
                    ))}
                  &nbsp;
                  <span>{Math.round(data.totalStars / data.starNumber)}</span>
                </div>
              )}
            </div>
            <div className='slider-container'>
              <Slider {...settings}>
                {data.images.map((img) => (
                  <img key={img} src={img} />
                ))}
              </Slider>
            </div>

            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            <div className='seller'>
              <h2>About The Seller</h2>
              <div className='user'>
                <img
                  src={user.img || '/assets/noavatar.jpg'}
                  // src='https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600'
                  alt=''
                />
                <div className='info'>
                  <span className='username'>{user.username}</span>
                  {!isNaN(data.totalStars / data.starNumber) && (
                    <div className='stars'>
                      {Array(Math.round(data.totalStars / data.starNumber))
                        .fill()
                        .map((item, i) => (
                          <img src='/assets/star.png' key={i} />
                        ))}
                    </div>
                  )}
                  <button>Contact Me</button>
                </div>
              </div>
              <div className='box'>
                <div className='items'>
                  <div className='item'>
                    <span className='title'>From</span>
                    <span className='desc'>{data?.user?.country || 'USA'}</span>
                  </div>
                  <div className='item'>
                    <span className='title'>Member since</span>
                    <span className='desc'>Aug 2022</span>
                  </div>
                  <div className='item'>
                    <span className='title'>Avg. response time</span>
                    <span className='desc'>4 hours</span>
                  </div>
                  <div className='item'>
                    <span className='title'>Last delivery</span>
                    <span className='desc'>1 day</span>
                  </div>
                  <div className='item'>
                    <span className='title'>Languages</span>
                    <span className='desc'>English</span>
                  </div>
                </div>
                <hr />
                <p>{user.desc}</p>
              </div>
            </div>
            <Reviews gigId={id} />
          </div>
          <div className='right'>
            <div className='price'>
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className='details'>
              <div className='item'>
                <img src='/assets/clock.png' alt='' />
                <span>{data.deliveryTime} Day(s) Delivery</span>
              </div>
              <div className='item'>
                <img src='/assets/recycle.png' alt='' />
                <span>{data.revisionNumber || 0} Revisions</span>
              </div>
            </div>
            <div className='features'>
              <div className='item'>
                <img src='/assets/greencheck.png' alt='' />
                <span>Prompt writing</span>
              </div>
              <div className='item'>
                <img src='/assets/greencheck.png' alt='' />
                <span>Artwork delivery</span>
              </div>
              <div className='item'>
                <img src='/assets/greencheck.png' alt='' />
                <span>Image upscaling</span>
              </div>
              <div className='item'>
                <img src='/assets/greencheck.png' alt='' />
                <span>Additional design</span>
              </div>
            </div>
            <Link to={`/payment/${id}`} className='link'>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gig;
