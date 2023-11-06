import React from 'react';
import './Orders.scss';
import { useQuery } from '@tanstack/react-query';
import apiRequest from '../../utils/apiRequest.js';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();
  // console.log(currentUser.user);
  const { isLoading, error, data } = useQuery({
    queryKey: [`/orders/${currentUser?.user.id}`],
    queryFn: () =>
      apiRequest
        .get(`/orders`)
        .then((resp) => {
          return resp.data.orders;
        })
        .catch(() => {
          throw new Error('Error fetching gig.');
        }),
  });

  const handleOrderContact = async (order) => {
    const buyerId = order.buyerId;
    const sellerId = order.sellerId;

    const id = sellerId + buyerId;

    try {
      const resp = await apiRequest.get(`/conversations/${id}`);
      navigate(`/messages/${resp.data.conversation.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const resp = await apiRequest.post(`/conversations/${id}`, {
          to: currentUser.user.isSeller ? sellerId : buyerId,
        });
        navigate(`/messages/${resp.data.conversation.id}`);
      }
    }
  };

  return (
    <div className='orders'>
      <div className='container'>
        <div className='title'>
          <h1>Orders</h1>
        </div>
        {isLoading ? (
          'Loading orders...'
        ) : error ? (
          'Error loading orders.'
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Type</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className='image' src={order.img} alt='' />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>{currentUser?.isSeller ? 'Seller' : 'Buyer'}</td>
                  <td>
                    <img
                      className='delete'
                      src='./assets/message.png'
                      onClick={() => handleOrderContact(order)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot></tfoot>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
