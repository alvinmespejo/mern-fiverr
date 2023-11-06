import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import apiRequest from '../../utils/apiRequest.js';
import './Message.scss';

const Message = () => {
  const { id } = useParams();
  const msgBox = useRef(null);
  const msgBoxContainer = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    // refetchOnWindowFocus: false,
    queryKey: [`messages/${id}`],
    queryFn: () =>
      apiRequest
        .get(`/messages/${id}`)
        .then((resp) => {
          return resp.data.messages;
        })
        .catch(() => {
          throw new Error('Error fetching conversations.');
        }),
  });

  const markConversationAsRead = () => {
    apiRequest.patch(`/conversations/${id}`);
  };

  const mutation = useMutation({
    mutationFn: (message) => {
      apiRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`messages/${id}`]);
      // scrollToBottom();
    },
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (msgBox.current?.value.trim() === '') {
      return;
    }

    mutation.mutate({
      conversationId: id,
      desc: msgBox.current?.value.trim(),
    });

    msgBox.current.value = '';
    scrollToBottom();
    // let message = e.target[0].value;
    // message = message.trim();
    // if (message.length <= 0) {
    //   return;
    // }
    // e.target[0].value = '';
  };

  const msgKeyboardEvent = (e) => {
    e.preventDefault();
    if (e.key !== 'Enter' || e.keyCode !== 13) {
      return;
    }

    handleSendMessage(e);
  };

  const scrollToBottom = () => {
    const lastElement = msgBoxContainer.current?.lastElementChild;
    lastElement?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    markConversationAsRead();
  }, []);

  return (
    <div className='message'>
      <div className='container'>
        <span className='breadcrumbs'>
          <Link to={'/messages'}>Messages</Link> &gt; John Doe &gt;
        </span>

        {isLoading ? (
          'Loading...'
        ) : error ? (
          'Error...'
        ) : (
          <div className='messages' ref={msgBoxContainer}>
            {data.map((msg) => (
              <div
                key={msg._id}
                className={
                  msg.userId === currentUser.user._id ? 'item owner ' : 'item'
                }
              >
                <img
                  src={currentUser?.user?.img || '/assets/noavatar.jpg'}
                  alt=''
                />
                <p>{msg.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form method='post'>
          <div className='write'>
            <textarea
              type='text'
              placeholder='Write a message'
              ref={msgBox}
              onKeyUp={msgKeyboardEvent}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Message;
