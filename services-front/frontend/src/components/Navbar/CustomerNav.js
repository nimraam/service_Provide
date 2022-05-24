import React, {useState} from 'react';
import {Link} from "react-router-dom";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Navbar.css';
import reactDOM from 'react-dom';


 const NavBarCustomer = () => {
  const[isMobile,setIsMobile]=useState(false);

  return (
    <>
     <nav className="navbar">
    <h3 className="logo">HelpIN</h3>
    <ul className={isMobile?"nav-links-mobile":"nav-links"}
    onClick={()=>
      setIsMobile(false)
    }>

        <Link to="/Customer" className="home">
             <li>Home</li>
        </Link>
        <Link to="/Customer/appointment" className="Appointments">
             <li>Appointments</li>
        </Link>
        <Link to="/Customer/profile" className="Profile">
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
export default NavBarCustomer