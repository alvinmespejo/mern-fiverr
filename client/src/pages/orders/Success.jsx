import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/apiRequest.js';

import './Success.scss';

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get('payment_intent');

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.patch('/orders', { payment_intent });
        setTimeout(() => {
          navigate('/orders');
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <div className='success'>
      <div className='container'>
        Payment successful. You are being redirected to the orders page. Please
        do not close the page
      </div>
    </div>
  );
};

export default Success;
