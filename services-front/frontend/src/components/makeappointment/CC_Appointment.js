import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import './Appointments.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import  NavBarCustomer  from '../Navbar/CustomerNav';
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {Get_Appointment_By_Email,Appointment_status}from '../../reducers/appointment'
import {NavBarCleaner}from '../Navbar/CleanerNav'
import { useLocation,useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const  Appointments = () => {
    const navigate=useNavigate()
    const btnstylecaroaccept={margin:'8px 0px ',background:'#19C133' ,color:'white',fontSize:'15px',marginLeft:'2%',marginTop:'1%'}
    const btnstylecaroreject={margin:'8px 0px ',background:'red' ,border:'none' ,color:'white',fontSize:'15px',marginLeft:'2%',marginTop:'1%'}      
    const location=useLocation()
    
    const dispatch=useDispatch()
    const {email,role_id}=useSelector((state)=>state.auth)
    // console.log(data)
    const { get_data}=useSelector((state)=>state.appointment)
   console.log(get_data)

    useEffect(() => {
dispatch(Get_Appointment_By_Email({email}))
        window.scrollTo(0, 0)
      }, [])

const AcceptStatus=(ele)=>{
    let newdate=((ele.date).slice(0,10)).replace(/-/g,'/')
   
    
   dispatch(Appointment_status({email:ele.user_email, pemail:ele.provider_email,userstatus:'Confirmed',providerstatus:"Confirmed",date:`${newdate}Z`}))
dispatch(Get_Appointment_By_Email({email}))
navigate('/cleaner')
}   
const RejectStatus=(ele)=>{
    let newdate=((ele.date).slice(0,10)).replace(/-/g,'/')
    dispatch(Appointment_status({email:ele.user_email, pemail:ele.provider_email,userstatus:'Reject',providerstatus:"Reject",date:`${newdate}Z`}))
dispatch(Get_Appointment_By_Email({email}))
navigate('/cleaner')
}   




  return (
    <>
    <body style={{backgroundColor:'#F6F8FF'}}>
        {role_id=='1'?( <NavBarCustomer/>):(null)}
  
 {role_id==='1'?(   <div class="Banner_wrapper">
        {role_id=='2'?(<NavBarCleaner/>):(null)}
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
            </div>):(null) }
     
            <Container>
                <Row>
                    <Col>
                        <h1 className='custom'>Your Appointments</h1>
                    </Col>
                    
                </Row>
            </Container>
            <Container  >
                
                {get_data?(<Card className='appointment_card' style={{backgroundColor:'white'}}>
                 {get_data.map((ele)=>{
                return(<>
                <Row >
                    <Col className='customtab'>
                        <h3 className='customhe'>Provider:{(ele.provider_email)}</h3>
                        <h6 >Date: {(ele.date).slice(0,10)}</h6>
                        <h6>Provider Status: {ele.providerstatus==='reject'?(<span style={{ color:'red'}}>{ele.providerstatus}</span>):(ele.providerstatus==='confirmed' ?(<span style={{ color:'green'}}>{ele.providerstatus}</span>):(<span style={{ color:'red'}}>{ele.providerstatus}</span>)  )} </h6>
                        {location.pathname=='/cleaner'?(<h6>User Email:{ele.user_email}</h6>):(null)}
                    </Col>

                    {(location.pathname=='/cleaner')&&(ele.providerstatus==='pending')?(<div className='cardbtncaro'>
       <Button onClick={()=>{
           AcceptStatus(ele)
       }} variant="contained" style={btnstylecaroaccept} className="carocardbtn">Accept</Button>
       <Button onClick={()=>{
           RejectStatus(ele)
       }}variant="contained" style={btnstylecaroreject} className="carocardbtn">Reject</Button>
       </div>):(null)}
                   
                    
                    </Row>
                    
                
                <br></br>
                <br></br><hr></hr>
                
                </>)
            })}  
                    
                </Card>):(
                
                <Row>   <h1>NO Appointments is Registered</h1></Row>
             )}
              
                
            </Container>
            </body>
        </>
  )
}
export default Appointments