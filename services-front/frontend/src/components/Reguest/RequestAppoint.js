import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Col from 'react-bootstrap/Col'
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import {  Button} from "@material-ui/core";

import  NavBarCustomer from '../Navbar/CustomerNav';
import '../Reguest/RequestAppointment.css';
import { useEffect } from 'react'
import {useParams,Link}from 'react-router-dom'
import {useSelector,useDispatch}from 'react-redux'
import {GetServiceByEmail}from '../../reducers/serviceReducer'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const RequestAppointment = () => {
    const dispatch=useDispatch()
    const {Get_service_Email}=useSelector((state)=>state.serviceReducer)
    const {pemail}=useParams()

    useEffect(() => {
        dispatch(GetServiceByEmail({email:pemail}))
        window.scrollTo(0, 0)
      }, [])
    const btnstyle={background:'#19C133' ,color:'white',fontSize:'18px',margin:'5% 42% '}

  return (
    <>
    <NavBarCustomer/>
    <body style={{backgroundColor:'#F6F8FF'}} >
    <div className="Banner_wrapper">
                <div className="Banner_overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="Banner_heading">
                                <div className="line">
                                    <h1 className='lineUp'>Request Appointment</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
    <Container >
                <Row>
                    
                        <h1 className='requ'>Your Cleaner is...</h1>
                    
                    
                </Row>
            </Container>
            <Container >
            <Row>
            <Col >
                <Card>
                    <Row className='reque' >
                    <Col >

                        <h3  className='req' >Name:{Get_service_Email.username}</h3>
                        <h3  className='req' >Service:{Get_service_Email.service_name}</h3>
                        <h3  className='req' >Hourly Rate:{GetServiceByEmail.hourlyrate}</h3>
                    </Col>
                        <Col>
                            <AccountCircleIcon  className='iconsreq'/>
                        </Col>
                    
                    </Row>
                    
                </Card>
            </Col>
          

            </Row>
            
            
                
                
                        
            </Container>
            <Link to='appointment' className='text-white text-decoration-none'>      <Button type="submit"  variant="contained" style={btnstyle} className="request">Request</Button></Link>

</body>
    </>
  )
}

export default RequestAppointment