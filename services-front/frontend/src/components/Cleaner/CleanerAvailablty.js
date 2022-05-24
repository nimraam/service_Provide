import React,{useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import './CleanerAvailablty.css'
import { Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NavBarCleaner } from '../Navbar/CleanerNav';
import {Get_Appointment,delete_available,add_available}from '../../reducers/availablityReducer'
import {useDispatch,useSelector}from 'react-redux'
import {Modal} from 'react-bootstrap';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import {TextField}from '@material-ui/core'
import { Navigate } from 'react-router-dom';


export const CleanerAvailability = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const onHide=() => setModalShow(false);
    const [value, setValue] = React.useState(new Date());
    const dispatch=useDispatch()
    const {Availability_by_email}=useSelector((state)=>state.availablityReducer)
    const {email,isAuth}=useSelector((state)=>state.auth)
    const btnstylelogout={margin:'8px 0px ',background:'#19C133' ,color:'white',fontSize:'15px',marginLeft:'2%',marginTop:'5%',marginBottom:'2%'}
const deleteData=(date)=>{
    let newdate=date.slice(0,10)
        dispatch(delete_available({email,date:newdate}))
        dispatch(Get_Appointment({email:email}))
        Navigate('/Cleaner/availability')
    }
    const SubmitData=()=>{
        let time=new Date(value)
        let day=time.getDate()
        let month=time.getMonth()+1
        let year=time.getFullYear()
dispatch(add_available({date:`${year}/${month}/${day}Z`,email}))
dispatch(Get_Appointment({email:email}))
setModalShow(false)
Navigate('/Cleaner/availability')

        


    }
   
    useEffect(()=>{
         dispatch(Get_Appointment({email:email}))
    },[])
    useEffect(()=>{
 dispatch(Get_Appointment({email:email}))
    },[dispatch,delete_available,add_available])
 


    const btnstyleedi={margin:'8px 0px ',background:'#19C133' ,color:'white',fontSize:'15px',marginLeft:'2%',marginTop:'5%',marginBottom:'2%'}
    const btnstyledel={margin:'8px 0px ',background:'red' ,color:'white',fontSize:'15px',marginLeft:'2%',marginTop:'5%',marginBottom:'2%'}
  return (
    <>
    <NavBarCleaner/>
    <body style={{backgroundColor:'#F6F8FF'}}>
             <div className="Banner_wrapper">
                <div className="Banner_overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="Banner_heading">
                                <div className="line">
                                    <h1 className='lineUp'>Availabilities</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <Modal show={modalShow} onHide={() => setModalShow(false)}
      
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Date
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <Stack style={{ marginTop: '50px' }}>

                                <DatePicker
                                    disableFuture
                                    label="Select date"
                                    openTo="year"
                                    views={['year', 'month', 'day']}
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} className='editbtn' style={btnstylelogout}>Close</Button>
        <Button className='editbtn' onClick={()=>{
           SubmitData()
        }} style={btnstylelogout} >Save</Button>
      </Modal.Footer>
    </Modal>



     <Container>
                <Row>
                    <Col >
                        <h1 className='available'>Your Availabilities</h1>
                        <div className='text-end'>

                        <Button className='text-start' lassName='editbtn' style={btnstylelogout} onClick={() => setModalShow(true)}>ADD</Button>
                        </div>
                    </Col>        
                </Row>
            </Container>
            <Container>
                <Row>
                   
                    <Card className='appointment_card' style={{backgroundColor:'white'}}>
                 
                 {Availability_by_email.map((ele)=>{
                     return(<>
                                         <Row >
                    <Col className='customtab'>
                        <h3>Date:{ele.slice(0,10)}</h3>
                        <div className="btnava justify-content-start">

      <Button onClick={()=>{
          deleteData(ele)
      }}  variant="contained" style={btnstyledel} className="avabtn">Delete</Button>
            </div>
                    </Col>
                        <Col className='customtab '>
                            <AccountCircleIcon  className='iconsforcustom'/>
                        </Col>
                    
                    </Row>
                    <br></br>
                <br></br><hr></hr>
                     </>)
                 })}
                </Card>
                <br></br>
                <br></br><hr></hr>                    
                </Row>
            </Container>
            </body>
   
    </>
  )
}
