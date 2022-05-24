import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {  Button, Grid, Paper, TextField} from "@material-ui/core";
import './CustomerAppointment.css'
import  NavBarCustomer  from './Navbar/CustomerNav';
import {MakeAppointment}from '../reducers/appointment'
import { useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';
import { useDispatch,useSelector } from 'react-redux';
import {useParams,useNavigate}from 'react-router-dom'
import Stack from '@mui/material/Stack';


const CustomerAppointments = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {email}=useSelector((state)=>state.auth)
    const [message,setmessage]=useState('')
    const [instruction,SetInstruction]=useState('')
    const {pemail,date}=useParams()
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    
      const inputData=(e)=>{
          if(!message){
              setmessage('')
          }
          const {name,value}=e.target
          SetInstruction(e.target.value)
      }
      const SubmitData=()=>{
          if(instruction){
              dispatch(MakeAppointment({pemail,date,instruction,user:email}))
              navigate('/Customer/appointment')
          }else{
              setmessage('plz enter your complete information')
          }

      }




    const paperstyleappoinment={padding :20, height: '70vh', width:'50%', margin: '20px auto'};
    const btnstyleappoinment={margin:'5% 25% ',background:'#19C133' ,color:'white',fontSize:'18px',width:'50%',height:'80px'}
  return (
    <>
    <body style={{backgroundColor:'#F6F8FF'}}>
    <NavBarCustomer/>
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

            <div className='Box'>
                <div className="Inner_Box">
       <h1 className="appoinmenthead">Book Your Appoinment</h1>
        <p style={{color:'red'}}>{message}</p>
         <TextField label="Instruction" value={instruction} name='instruction' onChange={inputData} placeholder="Instruction" required  style={{width:"100%",margin:'3% 0'}}
         /> 
      <Button type="submit" variant="contained" style={btnstyleappoinment} onClick={()=>{
          SubmitData()
      }} className="appointmentbtn">Book Appoinment</Button>
    </div>
    </div>
     </body>
        </>
  )
}
export default CustomerAppointments