import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import getAuthUser from '../../utils/getAuthUser.js';
import apiRequest from '../../utils/apiRequest.js';

import './MyGigs.scss';

const MyGigs = () => {
  const currentUser = getAuthUser();
  const queryClient = useQueryClient();

  const { isLoading, error, data, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: [`/my-gigs/${currentUser?.user?._id}`],
    queryFn: async () => {
      return apiRequest
        .get(`/gigs?userId=${currentUser?.user?._id}`)
        .then((resp) => {
          return resp.data.gigs;
        })
        .catch(() => {
          throw new Error('Error fetching gigs.');
        });
    },
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      await apiRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`/my-gigs/${currentUser?.user?._id}`]);
    },
  });

  const handleDelete = (id) => mutation.mutate(id);

  return (
    <div className='my-gigs'>
      <div className='container'>
        <div className='title'>
          <h1>Gigs</h1>
          <Link to={'/add'}>
            <button type='submit'>Add New Gig</button>
          </Link>
        </div>

        {isFetching && isLoading ? (
          'Loading...'
        ) : error ? (
          'Error...'
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((gig) => (
                <tr key={gig._id}>
                  <td>
                    <img className='image' src={gig.cover} alt='' />
                  </td>
                  <td>{gig.title}</td>
                  <td>{gig.price}</td>
                  <td>{gig.sales}</td>
                  <td>
                    <img
                      className='delete'
                      src='./assets/delete.png'
                      onClick={() => handleDelete(gig._id)}
                    />
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

export default MyGigs;
