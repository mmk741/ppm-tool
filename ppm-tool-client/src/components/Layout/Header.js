import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {logout} from '../../redux/securityAction'
import store from '../../redux/store'


function Header() {
 
    const user=useSelector(state=>state.security.user);
    const validToken=useSelector(state=>state.security.validToken);
   
    const logoutHandler=()=>{
        store.dispatch(logout());
           window.location.href='/';
     }

    const userIsAuthenticated = (
        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
  
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                <i className="fas fa-user-circle mr-1" />
                {user.fullName}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/logout"
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      );
  
      const userIsNotAuthenticated = (
        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      );

      let headerLinks;

      if (validToken && user) {
        headerLinks = userIsAuthenticated;
      } else {
        headerLinks = userIsNotAuthenticated;
      }
  


  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
    <div className="container">
        <Link className="navbar-brand" to="/">
            Personal Project Management Tool
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon" />
        </button>

        {headerLinks}
    </div>
</nav>
  )
}

export default Header