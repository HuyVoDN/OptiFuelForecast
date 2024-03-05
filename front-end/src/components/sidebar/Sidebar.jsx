import React, { useContext, useState } from 'react';
import userProfilePic from '../../assets/profile.png';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {SidebarData} from './SidebarData.jsx';
import './Sidebar.scss';
import { AuthContext } from '../../context/authContext.jsx';
const Sidebar = () => {
  //let { url } = useRouteMatch("/user");
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleSignOut = async (e) => {

    e.preventDefault();
    try {
      const response = await logout();
      const username = response.data;
      console.log('Username(From Sidebar):', username);
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
          <h1>John Doe</h1>
          </div>
        <nav className='nav-menu'>
        <ul className ="sidebar-menu-items">
          {
            SidebarData.map((item, index) => {
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