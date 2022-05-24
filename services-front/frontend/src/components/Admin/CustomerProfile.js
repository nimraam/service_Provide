import React from 'react'
// import { NavBarCustomer } from './Components/NavBarCustomer';
import './CustomerProfile.css';
import Col from 'react-bootstrap/Col'
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import {  Button} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { useParams}from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import {GetCustomerby_Email}from '../../reducers/CustomerReducer'

export const CustomerProfile = () => {
    const {Get_customer_Email}=useSelector((state)=>state.CustomerReducer)
    const dispatch=useDispatch()
    const {email}=useParams()
    const navigate = useNavigate();
    const HomePage = () => {
        navigate('/');
    }
    useEffect(() => {
        dispatch(GetCustomerby_Email({email}))
        window.scrollTo(0, 0)

      }, [])
    const btstyle = {margin:'80px 20% 100px 20%', backgroundColor: '#19C133', fontSize:"18px",width:'10%', height:'80px'}

  return (
    <>
    {/* <NavBarCustomer/> */}
    <body style={{backgroundColor:'#F6F8FF'}}>
             <div class="Banner_wrapper">
                <div class="Banner_overlay"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="Banner_heading">
                                <div class="line">
                                    <h1 class='lineUp'>Account</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <Container>
                <Row>
                    <Col >
                        <h1 className='edit'>Account Details</h1>
                    </Col>
                    
                </Row>
            </Container>
            <Container >
            <Row>
            <Col >
                <Card className='profile_card'>
                    <Row className='ed' >
                    <Col >

                        <h3  className='edita' >Name: {Get_customer_Email.username}</h3>
                        <h3  className='edita' >Email: {Get_customer_Email.email}</h3>
                        <h3  className='edita' >Address: {Get_customer_Email.address}</h3>
                    </Col>
                        <Col>
                            <AccountCircleIcon  className='iconsedit'/>
                        </Col>
                    
                    </Row>
                </Card>
            </Col>
          

            </Row>
            
            
                
                
                        
            </Container>
            <Button  className='registerbtn' type='submit' color='primary' variant='contained'  style={btstyle}>Edit</Button>
                <Button  className='registerbtn' type='submit' color='primary' variant='contained' onClick={HomePage} style={btstyle}>Logout</Button>

            </body>
    </>
  )
}
