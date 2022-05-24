import React,{useState,useEffect} from "react";
import {  Button, Grid, Paper, TextField, Typography ,Link} from "@material-ui/core";
import './login.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useDispatch,useSelector} from 'react-redux'
import {login,clearError}from '../../reducers/authReducer'
import  NavBar  from '../../components/Navbar/Navbar';
import {useNavigate}from 'react-router-dom'
export const Login = () =>{
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const {token,email,role_id,message,Error,loading,isAuth}=useSelector((state)=>state.auth)

  useEffect(() => {
    dispatch(clearError())
    if(isAuth){
      if(role_id=='1'){
        navigate('/Customer')
      }else if(role_id=="2"){
        navigate('/Cleaner')
      }else if(role_id=='3'){
        navigate('/admin')
      }
    }   
  }, [dispatch(login),Error])
  
  const [userData,setUserData]=useState({email:'',password:''})
  const papersstyle={padding :60,marginBotton:"20%"};
  const btnstyle={margin:'8px 0px ',background:'#19C133' ,color:'white',fontSize:'18px',display:'block',height:"2% !important"};
  const txtstyle ={padding:'20px 0'};
  const inputData=(e)=>{
    const {name,value}=e.target
    setUserData({...userData,[name]:value})
    if(Error){
      dispatch(clearError())
    }
  }

  const submitData=()=>{
dispatch(login(userData))
  }
  return(
    <>
    <NavBar/>
     <Grid align="center" className="grid" >
       <Paper  elevation={10} style={papersstyle} className="paperlogin">
         <strong> <span className="head" style={{margin:'20px'}}>HelpIN</span></strong>
      
         <h2>Welcome Back</h2>
         <p style={{color:'red'}} >{Error}</p>
         <TextField onChange={inputData} name='email' value={userData.email} style={txtstyle} label="Email" placeholder="Enter " fullWidth required 
         />
         <p></p>
         <TextField onChange={inputData} name='password' value={userData.password} style={txtstyle} label="Password" placeholder="Enter Password" fullWidth type="password"  required className="textfield"  />
         <p></p>
         <FormControlLabel style={{padding:'20px 0'}} 
        control={
          <Checkbox className="check"
            name="checkedB"
            style={{
              color:"#19C133"
            }}
          />
        }
        label="Remember Me" 
      />
      <Button type="submit" onClick={()=>{
        submitData()
      }}  variant="contained" style={btnstyle} className="loginbtn1" >Login</Button>
      
       </Paper>
       
    
     </Grid>
    </>
  )
}
export default Login;
