import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import apiRequest from '../../utils/apiRequest';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [userOptionsOpen, setUserOptionsOpen] = useState(false);
  const { pathname } = useLocation();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();
  const isNavActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', isNavActive);

    // react cleanup function
    return () => {
      window.removeEventListener('scroll', isNavActive);
    };
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await apiRequest.post('/auth/signout');
      localStorage.removeItem('currentUser');
      navigate('/');
    } catch (err) {
      console.log('Error signing out user.', err);
    }
  };

  return (
    <div className={active || pathname !== '/' ? 'navbar active' : 'navbar'}>
      <div className='container'>
        <div className='logo'>
          <Link to={'/'} className='link'>
            <span className='text'>fiverr</span>
          </Link>
          <span className='dot'>.</span>
        </div>
        <div className='links'>
          <span>Fiverr Bussiness</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser && (
            <Link to={'/signin'} className='link'>
              <span>Sign In</span>
            </Link>
          )}
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && (
            <Link to={'/register'} className='link'>
              <button>Join</button>
            </Link>
          )}
          {currentUser && (
            <div
              className='user'
              onClick={() => setUserOptionsOpen(!userOptionsOpen)}
            >
              <img
                src={currentUser?.user?.img || '/assets/noavatar.jpg'}
                alt='alternate image'
              />
              <span>{currentUser?.user?.username}</span>
              {userOptionsOpen && (
                <div className='options'>
                  {currentUser?.user?.isSeller && (
                    <>
                      <Link className='link' to={'/my-gigs'}>
                        Gigs
                      </Link>
                      <Link className='link' to={'/add'}>
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className='link' to={'/orders'}>
                    Orders
                  </Link>
                  <Link className='link' to={'/messages'}>
                    Messages
                  </Link>
                  <Link className='link' onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {(active || pathname !== '/') && (
        <>
          <hr />
          <div className='menu'>
            <Link className='link menuLink' to='/'>
              Graphics & Design
            </Link>
            <Link className='link menuLink' to='/'>
              Video & Animation
            </Link>
            <Link className='link menuLink' to='/'>
              Writing & Translation
            </Link>
            <Link className='link menuLink' to='/'>
              AI Services
            </Link>
            <Link className='link menuLink' to='/'>
              Digital Marketing
            </Link>
            <Link className='link menuLink' to='/'>
              Music & Audio
            </Link>
            <Link className='link menuLink' to='/'>
              Programming & Tech
            </Link>
            <Link className='link menuLink' to='/'>
              Business
            </Link>
            <Link className='link menuLink' to='/'>
              Lifestyle
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
