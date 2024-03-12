import React, { useContext, useState, useEffect } from 'react';
import userProfilePic from '../../assets/profile.png';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import {SidebarData} from './SidebarData.jsx';
import './Sidebar.scss';
import { AuthContext } from '../../context/authContext.jsx';
import Axios from 'axios';

const Sidebar = () => {
  //let { url } = useRouteMatch("/user");
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { username } = useParams();
  const sidebarItems = SidebarData();

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await Axios.get(`http://localhost:3000/users/${username}/firstlast`);
      const user = response.data;
      console.log(user);
      setFirstName(user.firstname);
      setLastName(user.lastname);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }
  fetchUser();
}, []);

  const handleSignOut = async (e) => {

    e.preventDefault();
    try {
      const response = await logout();
      const status = response.data;
      console.log(status);
      navigate(`/login`);
    } catch (error)
    {
      console.log(error);
      setError(error);
    }
  }
  return (
    <>
      <div className="sidebar">
        <div className="client-profile">
          <img src={userProfilePic}  alt='profile' />
          <h1>{firstName} {lastName}</h1>
          </div>
        <nav className='nav-menu'>
        <ul className ="sidebar-menu-items">
          {
            sidebarItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={index} className={item.cName}>
                  <NavLink to={item.path} className={`sidebar-link item-style ${isActive ? 'active-link' : 'sidebar-link'}`} >
                    {item.title}
                  </NavLink>
                </li>)
            })
          }
          <li className ="signout-btn">
            <button className="item-style" onClick={handleSignOut}>Sign Out</button>
            </li>
        </ul>
        </nav>
      </div>
    </>
  )
}

export default Sidebar