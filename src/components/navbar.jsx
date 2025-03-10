import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/navbar.css';
import { Link } from 'react-router-dom';  // Import Link



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
                    <li className="navbar1">
                        <button id="Navbar" onClick={handleHomeClick} style={{ background: 'none', border: 'none' }}>
                            <span className="material-symbols-light--home-outline"></span>
                        </button>
                    </li>
                    <li className='navbar2'>
                    <NavLink  to="/about"><span className="material-symbols-outlined">info</span></NavLink>
                    </li>
                </ul>       
            </nav>
        </div>
    );
}

export default Navbar;
