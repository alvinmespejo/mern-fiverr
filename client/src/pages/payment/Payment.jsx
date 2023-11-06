import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import apiRequest from '../../utils/apiRequest.js';
import CheckoutForm from '../../components/payment/CheckoutForm';

import './Payment.scss';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState('');
  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    const makePaymentIntentRequest = async () => {
      try {
        const resp = await apiRequest.post(`/orders/create-intent/${id}`);
        setClientSecret(resp.data.clientSecret);
      } catch (err) {
        console.log('Error fetching payment intent.', err);
      }
    };
    makePaymentIntentRequest();
  }, []);

  return (
    <div className='payment'>
      <div className='container'>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Payment;
