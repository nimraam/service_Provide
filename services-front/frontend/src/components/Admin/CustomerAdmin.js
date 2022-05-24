import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import './CustomerAdmin.css'
import {useNavigate}from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import  AdminNav from '../Navbar/AdminNav';
import { useDispatch,useSelector } from 'react-redux';
import {GetCustomer,Delete_Customer,Update_Customer}from '../../reducers/CustomerReducer'
import {  Button} from "@material-ui/core";
import { useEffect } from 'react'
import {Modal} from 'react-bootstrap';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@material-ui/core';
const  Appointments = () => {
    const [Edit,SetEdit]=useState({ last_name:"",first_name:"",gender:"",address:"",phone:0,})
    const [modalShow, setModalShow] = React.useState(false);
    const onHide=() => setModalShow(false);
    const {isAuth,role_id}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const txtstyle ={margin:'10px 0', width:'100%'}
    const handle=(e)=>{
        const {name,value}=e.target
        SetEdit({...Edit,[name]:value})
    }
    const EditCustomer=(ele)=>{
        console.log(ele)
        SetEdit({email:ele.email,first_name:ele.first_name,last_name:ele.last_name,address:ele.address,gender:ele.gender,phone:ele.phone})
    }
    const saveData=()=>{
       dispatch(Update_Customer(Edit))
       setModalShow(false)
       navigate('/admin/Customer')
       dispatch(GetCustomer())
    }
    const btnstyleedit={margin:'8px 0px ',background:'#19C133' ,color:'white',fontSize:'15px',marginLeft:'2%',marginTop:'5%',marginBottom:'2%'}
    const btnstylelogout={margin:'8px 0px ',background:'#19C133' ,color:'white',fontSize:'15px',marginLeft:'2%',marginTop:'5%',marginBottom:'2%'}
    const {Get_customer}=useSelector((state)=>state.CustomerReducer)
    console.log(Get_customer)
    useEffect(() => {
        if(isAuth&&role_id=='3'){
          } else{
            navigate('/')
          }
        window.scrollTo(0, 0)
        dispatch(GetCustomer())
      }, [])
  return (
    <>
    <body style={{backgroundColor:'#F6F8FF'}}>
    <AdminNav/>
    <Modal show={modalShow} onHide={() => setModalShow(false)}
      
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Account Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <TextField style={txtstyle} onChange={handle} value={Edit.first_name} name='first_name' label='First Name' placeholder="Enter First Name"  required/>
    <TextField style={txtstyle} onChange={handle} value={Edit.last_name} name='last_name' label='Last Name' placeholder="Enter Last Name"  required/>
    <FormControl >
        <FormLabel style={{margin:'20px 0', width:'100%'}} required>Gender : </FormLabel>
      
      <RadioGroup
        row
        name='gender'
        onChange={handle}
        value={Edit.gender}
        aria-labelledby="demo-row-radio-buttons-group-label"
      >
        <FormControlLabel value="F" control={<Radio style={{color: '#19c133'}} />} label="Female" />
        <FormControlLabel value="M" control={<Radio style={{color: '#19c133'}} />} label="Male" />
      </RadioGroup>
    </FormControl>
    <TextField style={txtstyle} onChange={handle} value={Edit.address} name='address' label='Location' placeholder="Enter your Location" required/>
    <TextField style={txtstyle} label='Number' onChange={handle} value={Edit.phone} name='phone' placeholder="Enter Number" type='tel' required/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} className='editbtn' style={btnstylelogout}>Close</Button>
        <Button className='editbtn' onClick={()=>{
            saveData()
        }} style={btnstylelogout} >Save</Button>
      </Modal.Footer>
    </Modal>
    <div className="Banner_wrapper">
                <div className="Banner_overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="Banner_heading">
                                <div className="line">
                                    <h1 className='lineUp'>Customer</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <Container>
                <Row>
                    <Col>
                        <h1 className='custom'>Your Customer</h1>
                    </Col>
                    
                </Row>
            </Container>
            <Container  >

                <Card className='appointment_card' style={{backgroundColor:'white'}}>
                   
                   {Get_customer.map((ele)=>{
                       return( 
                       <div>
                             <Row  >
                        <Col className='customtab'>
    
                            <h3 className='customhe'>Username: {ele.username}</h3>
                            <h6 className='customhe'>First Name: {ele.first_name}</h6>
                            <h6 className='customhe'>Last Name:{ele.last_name}</h6>
                            <h6 className='customhe'>Address:{ele.address}</h6>
                            <h6 className='customhe'>Gender:{ele.gender}</h6>
                            {/* <h6 >In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the</h6> */}
                        </Col>
                            <Col className='customtab '>
                                <AccountCircleIcon  className='iconsforcustom'/>
                            </Col>
                            <div className="btned" style={{justifyContent:'normal'}}>
            <Button onClick={()=>{
                setModalShow(true)
                EditCustomer(ele)

            }}  variant="contained" style={btnstyleedit} className="editbtn">Edit</Button>
      <Button  onClick={()=>{
          dispatch(Delete_Customer({email:ele.email}))
          navigate('/admin/customer')
          dispatch(GetCustomer())
      }}  variant="contained" style={btnstylelogout} className="editbtn">Delete</Button>
            </div>
                        </Row>  
                    <br></br>
                    <br></br><hr></hr>
                       </div>
                     )
                   })}
                </Card>
                <br></br>
                <br></br><hr></hr>
            </Container>
            </body>
        </>
  )
}
export default Appointments