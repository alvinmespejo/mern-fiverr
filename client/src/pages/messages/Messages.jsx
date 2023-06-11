import React from 'react';
import { Link } from 'react-router-dom';

import './Messages.scss';
const Messages = () => {
  const currentUser = {
    id: 1,
    username: 'John Doe',
    isSeller: true,
  };

  const message = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius voluptatem suscipit numquam nulla incidunt vel quidem eos magnam ratione cupiditate, commodi a, fuga vitae libero ipsum consequuntur architecto pariatur similique.`;

  return (
    <div className='messages'>
      <div className='container'>
        <div className='title'>
          <h1>Messages</h1>
        </div>
        <table>
          <tr>
            <th>{currentUser?.isSeller ? 'Buyer' : 'Seller'}</th>
            <th>Last Message</th>
            <th>date</th>
            <th>Action</th>
          </tr>

          <tr className='active'>
            <td>Charley Sharp</td>
            <td>
              <Link to={'/messages/123'} className='link'>
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 hour ago</td>
            <td>
              <button>Mark as Read</button>
            </td>
          </tr>

          <tr className='active'>
            <td>Charley Sharp</td>
            <td>
              <Link to={'/messages/123'} className='link'>
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 hour ago</td>
            <td>
              <button>Mark as Read</button>
            </td>
          </tr>
          <tr>
            <td>Charley Sharp</td>
            <td>
              <Link to={'/messages/123'} className='link'>
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 hour ago</td>
            <td></td>
          </tr>
          <tr>
            <td>Charley Sharp</td>
            <td>
              <Link to={'/messages/123'} className='link'>
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 hour ago</td>
            <td></td>
          </tr>
          <tr>
            <td>Charley Sharp</td>
            <td>
              <Link to={'/messages/123'} className='link'>
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 hour ago</td>
            <td></td>
          </tr>
          <tr>
            <td>Charley Sharp</td>
            <td>
              <Link to={'/messages/123'} className='link'>
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 hour ago</td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Messages;
