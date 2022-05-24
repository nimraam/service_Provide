import React,{useEffect, useState} from 'react'
import './Register.css';
import {useDispatch,useSelector}from 'react-redux'
import{Grid, Paper, TextField, Button} from '@material-ui/core';
import Box from '@mui/material/Box';
import NavBar from '../../components/Navbar/Navbar'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Register,clearError}from '../../reducers/authReducer'
import Select from '@mui/material/Select';
import { color } from '@mui/system';
import {GetService}from '../../reducers/serviceReducer'
import {useNavigate}from 'react-router-dom'
const RegisterCleaner = () => {
  const navigate=useNavigate()
  const {isRegister,Error}=useSelector((state)=>state.auth)
  const [User,setUser]=useState({last_name:'',first_name:"",username:"",email:"",C_password:"",password:"",role_id:"2",gender:"",address:"",phone:"",hourlyrate:0,age:0,service_name:"",})
    const {serverData}=useSelector((state)=>state.serviceReducer)
    const dispatch=useDispatch()
    const paperStyle={padding :60, width: '80%', margin: "20px auto"}
    const btstyle = { backgroundColor: '#19C133', fontSize:"18px"}
    const txtstyle ={margin:'10px 0', width:'100%'}

    useEffect(() => {
     dispatch(GetService())
    }, [])
    
  
    const handleChange = (e) => {
        const {name,value}=e.target
        setUser({...User,[name]:value})
        if(Error){
          dispatch(clearError())
        }
    };
    const submitData=()=>{
      // console.log(User)
      if(User.password===User.C_password){
        dispatch(Register(User))
      }
      if(isRegister){
        navigate('/login')
      }
     
    }
  return (<>
  <NavBar/>
        <Grid className='gridregister' >
            <Paper className='registerpaper' elevation={10} style={paperStyle} >
            <h2 className='details' style={{textAlign:'center'}}>Please Enter Your Details...</h2>
            <p style={{color:'red'}} >{Error}</p>
            <TextField style={txtstyle}  value={User.first_name} name='first_name' onChange={handleChange} label='First Name' placeholder="Enter First Name"  required/>
            <TextField style={txtstyle} label='Last Name'   value={User.last_name} name='last_name' onChange={handleChange} placeholder="Enter Last Name"  required/>
            <TextField style={txtstyle} label='Username'   value={User.username} name='username' onChange={handleChange} placeholder="Enter username"  required/>
            <TextField style={txtstyle} label='Address'   value={User.address} name='address' onChange={handleChange} placeholder="Enter Address"  required/>
            <TextField style={txtstyle} label='Email' value={User.email} name='email' onChange={handleChange}  placeholder='Enter Email' type='Email' required/>
            <TextField style={txtstyle} label='Password' value={User.password} name='password' onChange={handleChange} placeholder="Enter Password"type='password'  required/>
            <TextField style={txtstyle} label='Confirm Password' value={User.C_password} name='C_password' onChange={handleChange} placeholder="Re-enter Password" type='password'  required/>
            <FormControl variant="standard" sx={{margin:'10px 0',  minWidth: '100%' }}>
        <InputLabel id="demo-simple-select-standard-label">Service Name</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={User.service_name}
          name='service_name'
          onChange={handleChange}
          label="Service Name"
        >
            {serverData.map((ele)=>{
                return  <MenuItem key={ele._id} value={ele.service_name}>{ele.service_name}</MenuItem>
            })}
        </Select>
      </FormControl>
      <FormControl >
        <FormLabel  style={{margin:'20px 0'}} required>Gender : </FormLabel>
      <RadioGroup
      name='gender'
      value={User.gender}
      onChange={handleChange}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        // name="row-radio-buttons-group"
      >
        <FormControlLabel value="F" control={<Radio style={{color: '#19c133'}} />} label="Female" />
        <FormControlLabel value="M" control={<Radio style={{color: '#19c133'}} />} label="Male" />
      </RadioGroup>
    </FormControl>
     
            <TextField  style={txtstyle} value={User.hourlyrate} name='hourlyrate' onChange={handleChange} label='Rate' placeholder="Enter Hourly Rate" type='number' required/>
            <TextField style={txtstyle} value={User.phone} name='phone' onChange={handleChange} label='Number' placeholder="Enter Number" type='tel' required/>
            <TextField style={txtstyle} value={User.age} name='age' onChange={handleChange} label='age' placeholder="Enter Age" type='number' required/>
            <Button onClick={()=>{
                submitData()
            }} className='registerbtn' type='submit' color='primary' variant='contained' style={btstyle}>Register</Button>
            </Paper>
        </Grid>
        </>
  )
  }
  export default RegisterCleaner