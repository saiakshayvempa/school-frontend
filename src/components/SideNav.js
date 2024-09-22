import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import './SideNav.css';

const SideNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSideNav = () => {
        setIsOpen(!isOpen);
    };

    // Fetch user type from localStorage
    const loginData = JSON.parse(localStorage.getItem('login'));
    const user = loginData ? loginData.user_type_id : null;

    // Render navigation items based on user type
    const renderNavItems = () => {
        switch (user) {
            case 1:
                return (
                    <ul>
                        <li><Nav.Link as={Link} to="/StudentGrades" className='nav-link'><FontAwesomeIcon icon={faDoorOpen} color="Black" /> Grades</Nav.Link></li>
                    </ul>
                );
            case 2:
                return (
                    <ul>
                        <li><Nav.Link as={Link} to="/classGrades" className='nav-link'><FontAwesomeIcon icon={faDoorOpen} color="Black" /> Class Grades</Nav.Link></li>
                    </ul>
                );
            case 3:
                return (
                    <ul>
                        <li><Nav.Link as={Link} to="/StudentGrades" className='nav-link'><FontAwesomeIcon icon={faDoorOpen} color="Black" /> Grades</Nav.Link></li>
                        <li><Nav.Link as={Link} to="/payfees" className='nav-link'><FontAwesomeIcon icon={faDoorOpen} color="Black" /> Pay Fees</Nav.Link></li>
                    </ul>
                );
            case 4:
                return (
                    <ul>
                        <li><Nav.Link as={Link} to="/feestructure" className='nav-link'><FontAwesomeIcon icon={faHome} color="Black" /> Fee Structure</Nav.Link></li>
                        <li><Nav.Link as={Link} to="/Applicants" className='nav-link'><FontAwesomeIcon icon={faDoorOpen} color="Black" /> Applications</Nav.Link></li>
                        <li><Nav.Link as={Link} to="/admits" className='nav-link'><FontAwesomeIcon icon={faDoorOpen} color="Black" /> Admits</Nav.Link></li>
                    </ul>
                );
            case 5:
                return (
                    <ul>
                        <li><Nav.Link as={Link} to="/feestructure" className='nav-link'><FontAwesomeIcon icon={faHome} color="Black" /> Fee Structure</Nav.Link></li>
                        <li><Nav.Link as={Link} to="/Applicants" className='nav-link'><FontAwesomeIcon icon={faDoorOpen} color="Black" /> Applications</Nav.Link></li>
                        <li><Nav.Link as={Link} to="/admits" className='nav-link'><FontAwesomeIcon icon={faDoorOpen} color="Black" /> Admits</Nav.Link></li>
                        <li><Nav.Link as={Link} to="/classGrades" className='nav-link'><FontAwesomeIcon icon={faDoorOpen} color="Black" /> Class Grades</Nav.Link></li>
                        <li><Nav.Link as={Link} to="/payfees" className='nav-link'><FontAwesomeIcon icon={faDoorOpen} color="Black" /> Pay Fees</Nav.Link></li>
                    </ul>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className={`side-nav ${isOpen ? 'open' : ''}`}>
                <div className="nav-content">
                    {renderNavItems()}
                </div>
            </div>
            <button className="toggle-btn" onClick={toggleSideNav}>
                {isOpen ? 'Close' : 'Open'}
            </button>
        </div>
    );
};

export default SideNav;
