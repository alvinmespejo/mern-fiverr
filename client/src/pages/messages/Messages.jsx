import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiRequest from '../../utils/apiRequest.js';
import moment from 'moment/moment.js';

import './Messages.scss';

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: [`conversations${currentUser?.user.id}`],
    queryFn: () =>
      apiRequest
        .get(`/conversations`)
        .then((resp) => {
          return resp.data.conversations;
        })
        .catch(() => {
          throw new Error('Error fetching conversations.');
        }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      apiRequest.patch(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`conversations${currentUser?.user.id}`]);
      process.env;
    },
  });

  const handleReadConversation = (id) => mutation.mutate(id);

  useEffect(() => {});

  return (
    <div className='messages'>
      <div className='container'>
        <div className='title'>
          <h1>Messages</h1>
        </div>

        {isLoading ? (
          'Loading conversations...'
        ) : error ? (
          'Error loading conversations...'
        ) : (
          <table>
            <thead>
              <tr>
                <th>{currentUser?.isSeller ? 'Buyer' : 'Seller'}</th>
                <th>Last Message</th>
                <th>date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((conversation) => (
                <tr
                  key={conversation._id}
                  className={
                    (currentUser.user.isSeller && !conversation.readBySeller) ||
                    (!currentUser.user.isSeller && !conversation.readByBuyer)
                      ? 'active'
                      : ''
                  }
                >
                  <td>
                    {currentUser?.user?.isSeller
                      ? conversation?.buyerId?.username
                      : conversation?.sellerId?.username}
                  </td>
                  <td>
                    <Link to={`/messages/${conversation.id}`} className='link'>
                      {conversation.lastMessage?.substring(0, 100)}
                    </Link>
                  </td>
                  <td>{moment(conversation.updatedAt).fromNow()}</td>
                  <td>
                    {((currentUser.user.isSeller &&
                      !conversation.readBySeller) ||
                      (!currentUser.user.isSeller &&
                        !conversation.readByBuyer)) && (
                      <button
                        onClick={() => handleReadConversation(conversation._id)}
                      >
                        Mark as Read {conversation._id}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Messages;
