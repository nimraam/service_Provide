import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
// import './Appointments.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import  NavbarAdmin from '../Navbar/AdminNav';
import { useEffect } from 'react'
import {getServiceProvider,Delete_cleaner,Update_provider}from '../../reducers/CleanerReducer'
import {useDispatch,useSelector}from 'react-redux'
import {  Button} from "@material-ui/core";
import {useNavigate}from 'react-router-dom'
import {Modal} from 'react-bootstrap';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {TextField}from '@material-ui/core'

const Cleaner = () => {
    const [Edit,SetEdit]=useState({last_name:"", first_name:"", gender:"", address:"", phone:"",hourlyrate:0})
    const [modalShow, setModalShow] = React.useState(false);
    const onHide=() => setModalShow(false);
    const [value, setValue] = React.useState(new Date());
    const navigate=useNavigate()
    const {isAuth,role_id}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const btnstyleedit={margin:'8px 0px ',background:'#19C133' ,color:'white',fontSize:'15px',marginLeft:'2%',marginTop:'5%',marginBottom:'2%'}
    const {get_service_provider}=useSelector((state)=>state.CleanerReducer)
    console.log(get_service_provider)

    useEffect(() => {
        if(isAuth&&role_id==='3'){
          } else{
            navigate('/')
          }
        dispatch(getServiceProvider())
        window.scrollTo(0, 0)
      }, [])
      const EditCleaner=(ele)=>{
  
          SetEdit({first_name:ele.first_name,last_name:ele.last_name,gender:ele.gender,address:ele.address,phone:ele.phone,hourlyrate:ele.hourlyrate,email:ele.email})
      }
      const saveData=()=>{
            dispatch(Update_provider(Edit))
            setModalShow(false)
            dispatch(getServiceProvider())
            navigate('/admin/Cleaner')
      }
      const handle=(e)=>{
          const {name,value}=e.target;
          SetEdit({...Edit,[name]:value})
      }

      const txtstyle ={margin:'10px 0', width:'100%'}
      
      const btnstylelogout={margin:'8px 0px ',background:'#19C133' ,color:'white',fontSize:'15px',marginLeft:'2%',marginTop:'5%',marginBottom:'2%'}


  return (
    <>
    <body style={{backgroundColor:'#F6F8FF'}}>
    <NavbarAdmin/>
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
      <TextField style={txtstyle} label='First Name' name='first_name' value={Edit.first_name} onChange={handle}  placeholder="Enter First Name"  required/>
    <TextField style={txtstyle} label='Last Name' name='last_name' value={Edit.last_name} onChange={handle} placeholder="Enter Last Name"  required/>
    <FormControl >
        <FormLabel style={{margin:'20px 0', width:'100%'}} required>Gender : </FormLabel>      
      <RadioGroup
      name='gender'
      value={Edit.gender}
      onChange={handle}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
      
      >
        
      <FormControlLabel value="F"  control={<Radio style={{color: '#19c133'}} />} label="Female" />
        <FormControlLabel value="M" control={<Radio style={{color: '#19c133'}} />} label="Male" />
        {/* <FormControlLabel value="other" control={<Radio style={{color: '#19c133'}} />} label="Other" /> */}
        
      </RadioGroup>
    </FormControl>
    <TextField style={txtstyle} label='Location' name='address' value={Edit.address} onChange={handle} placeholder="Enter your Location" required/>
    <TextField style={txtstyle} label='Number' name='phone' value={Edit.phone} onChange={handle} placeholder="Enter Number" type='tel' required/>
    <TextField style={txtstyle} label='Hourly Rate' name='hourlyrate' value={Edit.hourlyrate} onChange={handle} placeholder="Enter hourlyrate" type='number' required/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} className='editbtn' style={btnstylelogout}>Close</Button>
        <Button className='editbtn' onClick={saveData} style={btnstylelogout} >Save</Button>
      </Modal.Footer>
    </Modal>
    <div class="Banner_wrapper">
                <div class="Banner_overlay"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="Banner_heading">
                                <div class="line">
                                    <h1 class='lineUp'>Service Provider</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <Container>
                <Row>
                    <Col>
                        <h1 className='custom'>Service Provider List</h1>
                    </Col>
                    
                </Row>
            </Container>
            <Container  >
                <Card className='appointment_card' style={{backgroundColor:'white'}}>


                    {get_service_provider.map((ele)=>{
                        return(<>
                          <Row >
                    <Col className='customtab'>

                        <h3 className='customhe'>Name:{ele.username}</h3>
                        <h6>Email:{ele.email} </h6>
                        <h6>Address:{ele.address} </h6>
                        <h6>Hourly Rate:{ele.hourlyrate}$ </h6>
                        <h6>Service Name:{ele.service_name} </h6>


                    </Col>
                        <Col className='customtab '>
                            <AccountCircleIcon  className='iconsforcustom'/>
                        </Col>
                    
                    </Row>
                    <div className="btned" style={{justifyContent:'normal'}}>
            <Button  variant="contained" onClick={()=>{
                setModalShow(true)
                EditCleaner(ele)
            }} style={btnstyleedit} className="editbtn">Edit</Button>
      <Button    variant="contained" onClick={()=>{
            dispatch(Delete_cleaner({email:ele.email}))
            navigate('/admin/Cleaner')
            dispatch(getServiceProvider())

      }} style={btnstylelogout} className="editbtn">Delete</Button>
            </div>
                
                <br></br>
                <br></br><hr></hr>
                        
                        
                        
                        </>)
                    })}
                  
                
                   
                    
                </Card>
                <br></br>
                <br></br><hr></hr>
            </Container>
            </body>
        </>
  )
}
export default Cleaner