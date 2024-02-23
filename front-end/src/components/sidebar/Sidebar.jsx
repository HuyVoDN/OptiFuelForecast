import React from 'react';
import userProfilePic from '../../assets/profile.png';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {SidebarData} from './SidebarData.jsx';
import './Sidebar.scss';

const Sidebar = () => {
  //let { url } = useRouteMatch("/user");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // sign out logic implementation will be added later stage, hardcode for now
    navigate('/login');
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