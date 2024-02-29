import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css'; // Adjust the path to your CSS file

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__item">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            isActive ? 'navigation__link navigation__link_active' : 'navigation__link'
                        }
                    >
                        Home
                    </NavLink>
                </li>
                {/* Additional navigation items here */}
                <li className="navigation__item">
                    <NavLink 
                        to="/about" 
                        className={({ isActive }) => 
                            isActive ? 'navigation__link navigation__link_active' : 'navigation__link'
                        }
                    >
                        About
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
