import React,{useState} from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Register.css';
import{Grid, Paper, TextField, Button} from '@material-ui/core';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { color } from '@mui/system';
import NavBar from '../../components/Navbar/Navbar'
import {Register,clearError}from '../../reducers/authReducer'
import {useDispatch,useSelector}from 'react-redux'
import {useNavigate}from 'react-router-dom'
const RegisterCustomer = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {message,Error,loading, isRegister}=useSelector((state)=>state.auth)
    const [User, setUser] = useState({first_name:'',last_name:'',username:"",email:"",password:'',C_password:'',role_id:'1',gender:"",address:'',phone:""})
    const paperStyle={padding :60, width: '80%', margin: "20px auto"}
    const btstyle3 = { backgroundColor: '#19C133', fontSize:"18px"}
    const txtstyle ={margin:'10px 0', width:'100%'}
    const inputData=(e)=>{
        const {name,value}=e.target
        setUser({...User,[name]:value})
        if(Error){
          dispatch(clearError())
        }
    }
    const SubmitData=()=>{
      if(User.password===User.C_password){
        dispatch(Register(User))
      }
      if(isRegister){
      navigate('/login') 
      }
    }
  return (
    <>
   <NavBar/>
        <Grid className='gridregistercustomer' >
            <Paper  className='registerpapercustomer' elevation={10} style={paperStyle}>
            <h2 style={{textAlign:"center"}} className='details'>Please Enter Your Details...</h2>
            <p style={{color:'red'}} >{Error}</p>
            <TextField style={txtstyle}   onChange={inputData}  value={User.first_name} name='first_name' label='First Name' placeholder="Enter First Name"  required/>
            <TextField style={txtstyle}  onChange={inputData} value={User.last_name} name='last_name' label='Last Name' placeholder="Enter Last Name"  required/>
            <TextField style={txtstyle} onChange={inputData}  value={User.username}name='username' label='User Name' placeholder="Enter Full Name"  required/>
            <TextField style={txtstyle} onChange={inputData} value={User.email} name='email' label='Email' placeholder='Enter Email' type='Email' required/>
            <TextField style={txtstyle} onChange={inputData} value={User.password} name='password' label='Password' placeholder="Enter Password"type='password'required/>
            <TextField style={txtstyle} onChange={inputData} value={User.C_password} name='C_password' label='Confirm Password' placeholder="Re-enter Password" type='password' required/>
        <FormControl >
        <FormLabel  style={{margin:'20px 0'}} required>Gender : </FormLabel>
      <RadioGroup
      name='gender'
      value={User.gender}
      onChange={inputData}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        // name="row-radio-buttons-group"
      >
        <FormControlLabel value="F" control={<Radio style={{color: '#19c133'}} />} label="Female" />
        <FormControlLabel value="M" control={<Radio style={{color: '#19c133'}} />} label="Male" />
      </RadioGroup>
    </FormControl>
            <TextField style={txtstyle} onChange={inputData} value={User.address} name='address' label='Address' placeholder="Enter your address"  required/>
            <TextField style={txtstyle} onChange={inputData} value={User.phone} name='phone' label='Phone No.' placeholder="Enter your contact number" type='tel'  required/>
            <Button onClick={()=>{
                SubmitData()
            }} className='registerbtncustomer' type='submit' color='primary' variant='contained'  style={btstyle3}>Register</Button>
            </Paper>
        </Grid>
        </>
  )
  }
export default RegisterCustomer