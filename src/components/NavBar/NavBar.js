import React from 'react';
import './NavBar.scss';
import {useAuth} from "../../auth";
import {Link} from "react-router-dom";

const NavBar = () => {
    const auth = useAuth();

    return (
        <div className="NavBar">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <span className="navbar-brand">{ auth.user.username }</span>

                    <div className="collapse navbar-collapse" id="mainNavBar">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/upload">Carica Report</Link>
                            </li>
                        </ul>

                        <button className="btn btn-secondary my-2 my-sm-0" onClick={() => auth.signout()}>Logout</button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
