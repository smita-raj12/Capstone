import React from 'react'
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-nav">
            <NavLink className="nav-link" to="/TimeEntryForm">
                TimeEntries
            </NavLink>
            <NavLink className="nav-link" to="/WorkOrders">
                WorkOrders
            </NavLink>
            <NavLink className="nav-link" to="/Controlers">
                Controlers
            </NavLink>
            <NavLink className="nav-link" to='/Register'>
                Register
            </NavLink>
            <NavLink className="nav-link" to='/Login'>
                Login
            </NavLink>
        </div>
    </nav>
  )
}

export default NavBar