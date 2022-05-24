import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './Navbar.css';
import reactDOM from 'react-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'


export const NavBarCleaner = () => {
  const[isMobile,setIsMobile]=useState(false);

  return (
    <>
    <nav className="navbar">
    <h3 className="logo">HelpIN</h3>
    <ul className={isMobile?"nav-links-mobile":"nav-links"}
    onClick={()=>
      setIsMobile(false)
    }>

        <Link to="/Cleaner" className="home">
             <li>Home</li>
        </Link>
     
        <Link to="/Cleaner/availability" className="Availability">
             <li>Availability</li>
        </Link>
        <Link to="/Cleaner/profile" className="Profile">
             <li>Profile</li>
        </Link>
     
        </ul>
        <button className="mobile-menu-icon" onClick={()=> setIsMobile(!isMobile)}>
    {isMobile ? (<i className="fas fa-times"></i>) : (<i className="fas fa-bars"></i>)}
     </button>
        </nav>
        </>
  );
}
