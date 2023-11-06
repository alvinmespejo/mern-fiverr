import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GigReducer, INITIAL_STATE } from '../../reducers/GigReducers.js';
import upload from '../../utils/upload.js';
import apiRequest from '../../utils/apiRequest.js';
import getAuthUser from '../../utils/getAuthUser.js';
import './Add.scss';

const Add = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(GigReducer, INITIAL_STATE);

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (e.target[0].value.trim() === '') return;

    dispatch({
      type: 'ADD_FEATURES',
      payload: e.target[0].value,
    });
    e.target[0].value = '';
  };

  const handleRemoveFeature = (feature) => {
    dispatch({ type: 'REMOVE_FEATURES', payload: feature });
  };

  const handleInputChange = (e) => {
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { value: e.target.value, name: e.target.name },
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(file);
      const images = await Promise.all(
        [...files].map(async (file) => await upload(file))
      );

      dispatch({
        type: 'ADD_IMAGES',
        payload: { cover, images },
      });
      // setUploading(false);
    } catch (err) {
      setUploading(false);
      console.log(err);
    }
  };

  const mutation = useMutation({
    mutationFn: (data) => {
      return apiRequest.post('/gigs', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`/my-gigs/${getAuthUser?.user?._id}`]);
      navigate('/my-gigs');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpload();
    mutation.mutate(state);
  };

  return (
    <div className='add'>
      <div className='container'>
        <h1>Add New Gig</h1>
        <div className='sections'>
          <div className='info'>
            <label htmlFor=''>Title</label>
            <input
              name='title'
              type='text'
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleInputChange}
            />
            <label htmlFor=''>Category</label>
            <select
              name='cat'
              id='cat'
              defaultValue={'design'}
              onChange={handleInputChange}
            >
              <option value='design'>Design</option>
              <option value='web'>Web Development</option>
              <option value='animation'>Animation</option>
              <option value='music'>Music</option>
            </select>
            <div className='images'>
              <div className='imagesInputs'>
                <label htmlFor=''>Cover Image</label>
                <input
                  type='file'
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor=''>Upload Images</label>
                <input
                  type='file'
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            <label htmlFor=''>Description</label>
            <textarea
              name='desc'
              id='desc'
              placeholder='Brief descriptions to introduce your service to customers'
              cols='0'
              rows='16'
              onChange={handleInputChange}
            ></textarea>
            <button onClick={handleSubmit} disabled={uploading}>
              Create
            </button>
          </div>
          <div className='details'>
            <label htmlFor=''>Service Title</label>
            <input
              name='shortTitle'
              id='shortTitle'
              type='text'
              placeholder='e.g. One-page web design'
              onChange={handleInputChange}
            />
            <label htmlFor=''>Short Description</label>
            <textarea
              name='shortDesc'
              id='shortDesc'
              placeholder='Short description of your service'
              cols='30'
              rows='10'
              onChange={handleInputChange}
            ></textarea>
            <label htmlFor=''>Delivery Time (e.g. 3 days)</label>
            <input
              type='number'
              name='deliveryTime'
              onChange={handleInputChange}
            />
            <label htmlFor=''>Revision Number</label>
            <input
              type='number'
              name='revisionNumber'
              onChange={handleInputChange}
            />
            <label htmlFor=''>Add Features</label>
            <form className='add' onSubmit={handleAddFeature}>
              <input type='text' placeholder='e.g. Web design' />
              <button type='submit'>Add</button>
            </form>
            <div className='addedFeatures'>
              {state.features?.map((feature) => (
                <div className='item' key={feature}>
                  <button onClick={() => handleRemoveFeature(feature)}>
                    {feature}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor=''>Price</label>
            <input type='number' name='price' onChange={handleInputChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
