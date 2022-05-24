import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import './CleanerAvailablty.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NavBarCleaner } from '../Navbar/CleanerNav';
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {Get_availabilities}from '../../reducers/availablityReducer'

export const CleanerAppointments = () => {
  
    useEffect(() => {
        dispatch(Get_availabilities({email}))
        window.scrollTo(0, 0)
      }, [])
  return (
    <>
    <body style={{backgroundColor:'#F6F8FF'}}>
    <NavBarCleaner/>
    <div class="Banner_wrapper">
                <div class="Banner_overlay"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="Banner_heading">
                                <div class="line">
                                    <h1 class='lineUp'>Appointments</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
      
            <Container  >
                <Card className='appointment_card' style={{backgroundColor:'white'}}>
                    <Row >
                    <Col className='customtab'>

                        <h3 className='customhe'>Appointment 1</h3>
                        <h6 >In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the</h6>
                    </Col>
                        <Col className='customtab '>
                            <AccountCircleIcon  className='iconsforcustom'/>
                        </Col>
                    
                    </Row>
                    
                
                <br></br>
                <br></br><hr></hr>
                
                    <Row >
                    <Col className='customtab'>

                        <h3 className='customhe'>Appointment 2</h3>
                        <h6 >In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the</h6>
                    </Col>
                        <Col className='customtab '>
                            <AccountCircleIcon  className='iconsforcustom'/>
                        </Col>
                    
                    </Row>
                    
                
                <br></br>
                <br></br><hr></hr>
                
                    <Row >
                    <Col className='customtab'>

                        <h3 className='customhe'>Appointment 3</h3>
                        <h6 >In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the</h6>
                    </Col>
                        <Col className='customtab '>
                            <AccountCircleIcon  className='iconsforcustom'/>
                        </Col>
                    
                    </Row>
                    
                </Card>
                <br></br>
                <br></br><hr></hr>
            </Container>
            </body>
        </>
  )
}
