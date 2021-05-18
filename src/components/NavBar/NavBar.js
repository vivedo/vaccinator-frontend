import React, {useState} from 'react';
import './NavBar.scss';
import {useAuth} from "../../auth";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt, faSyringe} from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
    const auth = useAuth();

    const [collapse, setCollapse] = useState(true);

    return (
        <div className="NavBar">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <span className="navbar-brand">{ auth.user.username }</span>

                    <div className={`navbar-toggler ${collapse ? 'c' : ''}`} onClick={() => setCollapse(!collapse)}>
                        <FontAwesomeIcon icon={faSyringe} />
                    </div>

                    <div className={`${collapse ? 'collapse' : ''} navbar-collapse`} id="mainNavBar" onClick={() => setCollapse(true)}>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/upload">Carica Report</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="javascript:void()" onClick={() => auth.signout()}>
                                    Logout <FontAwesomeIcon icon={faSignOutAlt} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
