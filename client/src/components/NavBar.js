import React from 'react'
import { NavLink } from "react-router-dom";

function NavBar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {user}
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">

            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <NavLink className="nav-link" to="/TimeEntries">
                    TimeEntries
                </NavLink>
                <NavLink className="nav-link" to="/WorkOrders">
                    WorkOrders
                </NavLink>
                <NavLink className="nav-link" to="/Controlers">
                    Controlers
                </NavLink>
                {!user &&(
                    <React.Fragment>
                        <NavLink className="nav-link" to='/Register'>
                            Register
                        </NavLink>
                        <NavLink className="nav-link" to='/Login'>
                            Login
                        </NavLink>
                    </React.Fragment>
                )}
                {user && (
                    <React.Fragment>
                    <NavLink className="nav-link" to="/profile">
                        {user}
                    </NavLink>
                    <NavLink className="nav-link" to="/logout">
                        Logout
                    </NavLink>
                    </React.Fragment>
                )}
            </ul>
        </div>
    </nav>
    )
}

export default NavBar