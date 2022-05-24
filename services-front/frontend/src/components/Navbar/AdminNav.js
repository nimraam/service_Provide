import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './Navbar.css';
import reactDOM from 'react-dom';



const NavBarAdmin = () => {
  const[isMobile,setIsMobile]=useState(false);

  return (
    <>
    <nav className="navbar">
    <h3 className="logo">HelpIN</h3>
    <ul className={isMobile?"nav-links-mobile":"nav-links"}
    onClick={()=>
      setIsMobile(false)
    }>

        <Link to="/admin" className="home">
             <li>Home</li>
        </Link>
        <Link to="/admin/Customer" className="Customers">
             <li>Customers</li>
        </Link>
        <Link to="/admin/Cleaner" className="Cleaners">
             <li>Service Provider</li>
        </Link>
        <Link to="/admin/profile" className="Profile">
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
export default NavBarAdmin