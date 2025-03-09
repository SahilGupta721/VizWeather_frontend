import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/navbar.css';

function Navbar({ onHomeClick }) {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        // Trigger the reset function passed from the parent (Home)
        if (onHomeClick) {
            onHomeClick(); // Reset the state
        }

        // Navigate to the home page
        navigate('/');
    };

    return (
        <div id="navbar">
            <nav>
                <ul>
                    <li className="navbar">
                        <button  id="Navbar" onClick={handleHomeClick} style={{ background: 'none', border: 'none' }}>
                            <span className="material-symbols-light--home-outline"></span>
                        </button>
                    </li>
                    <li className='navbar'>
                        <NavLink to='/About'>
                            <span className="material-symbols-outlined">
                                contact_support
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
