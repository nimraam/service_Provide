import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Col from 'react-bootstrap/Col'
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import {  Button} from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import CC_Appointment from '../makeappointment/CC_Appointment'

import { NavBarCleaner } from '../Navbar/CleanerNav';
import { useSelector } from 'react-redux';

import './CleanerHomepage.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Carousel from "react-bootstrap/Carousel";



export const CleanerHomepage = () => {
    const {isAuth,role_id}=useSelector((state)=>state.auth)

    const navigate = useNavigate();
    const HomePage = () => {
        navigate('/');
    }
    useEffect(() => {
        if(isAuth){
            if(role_id=='1'){
              navigate('/Customer')
            }else if(role_id=="2"){
              navigate('/cleaner')
            }else if(role_id=='3'){
              navigate('/admin')
            }
          }  
        
        window.scrollTo(0, 0)
      }, [])
      const btnstylecaroaccept={margin:'8px 0px ',background:'#19C133' ,color:'white',fontSize:'15px',marginLeft:'2%',marginTop:'1%'}
const btnstylecaroreject={margin:'8px 0px ',background:'#19C133' ,color:'white',fontSize:'15px',marginLeft:'2%',marginTop:'1%'}
      
  return (
    <>
    <NavBarCleaner/>
    <body style={{backgroundColor:'#F6F8FF'}}>
    <div className="banner_wrapper">
                <div className="banner_overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="banner_heading">
                                <div className="animated-title">
                                    <div className="text-top">
                                        <div>
                                            <span>WELCOME</span>
                                            <span>TO</span>
                                        </div>
                                    </div>
                                    <div className="text-bottom">
                                        <div>HelpIN</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    <Container>
                <Row>
                  <CC_Appointment/>
                    
                </Row>
            </Container>
       
</body>
    </>
  )
}
