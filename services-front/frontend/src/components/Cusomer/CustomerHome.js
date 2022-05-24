import React, { useEffect,useState } from 'react'
import Register_bg from '../../images/Register_bg.jpg';
import NavBarCustomer from '../Navbar/CustomerNav';
import { Button } from '@material-ui/core';
import './CustomerHomepage.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import {GetService}from '../../reducers/serviceReducer' 
import {useSelector,useDispatch}from 'react-redux'
import { set } from 'date-fns';
const CustomerHomepage = () => {
    const {today,settoday}=useState('')

    const timefunction=()=>{
        let time=new Date()
        // let day=time.getDate()
        // let month=time.getMonth()+1
        // let year=time.getFullYear()
        // settoday(`${year}-${month}-${day}`)
        // settoday(time)
        }




    const {isAuth,role_id}=useSelector((state)=>state.auth)
    const dispatch =useDispatch()
    const [message,setMessage]=useState('')
    const [ServiceName, setServiceName] = React.useState('');
    const [value, setValue] = React.useState(new Date());
    const {serverData,loading}=useSelector((state)=>state.serviceReducer)
    const navigate = useNavigate();
    const SubmitData=()=>{
if(value&&ServiceName){
    var  mydate = new Date(value);
   var date=mydate.getDate()
   var month=mydate.getMonth()+1
   var year=mydate.getFullYear()
   const new_date=`${year}-${month}-${date}Z`
   navigate(`/SelectService/${ServiceName}/${new_date}`)
}else{
    setMessage('incomplete fied')
}
    }
    useEffect(()=>{
        if(isAuth){
            if(role_id=='1'){
              navigate('/Customer')
            }else if(role_id=="2"){
              navigate('/cleaner')
            }else if(role_id=='3'){
              navigate('/admin')
            }
          }  
          timefunction()
        dispatch(GetService())
    },[])
    const handleChange = (event) => {
        setServiceName(event.target.value);
    };

    const btstyle = { margin: '40px 0', backgroundColor: '#19C133', fontSize: "18px", width: '100%', height: '60px' }
    return (
        <>
        <NavBarCustomer/>
            <div className="banner_wrapper">
                <div className="banner_overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="banner_heading">
                                <div className="animated-title">
                                    <div className="text-top">
                                        <div>
                                            <span>WELCOME</span>
                                            <span>TO</span>
                                        </div>
                                    </div>
                                    <div className="text-bottom">
                                        <div>HelpIN</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='Box'>
                <div className="Inner_Box">
                    <span style={{ backgroundColor: 'transparent', color: 'rgba(255, 255, 255, 0.877)' }}>
                        <h1 style={{ paddingTop: '40px', fontSize: '60px', color: '#19C133' }}>HelpIN</h1>
                        <h1 style={{ paddingTop: '20px', fontSize: '40px', color: 'black' }}>What services are you looking for today?</h1>
                        <p style={{color:'red'}} >{message}</p>
                        <FormControl variant="standard" sx={{ margin: '10px 0', minWidth: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Select Service</InputLabel>
                            <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name='service_name'
          label="Service Name"
          value={ServiceName}
          onChange={handleChange}
        >
            {serverData.map((ele)=>{
                return  <MenuItem  key={ele._id} value={ele.service_name}>{ele.service_name}</MenuItem>
            })}
        </Select>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <Stack style={{ marginTop: '50px' }}>

                                <DatePicker
                                // minDate={today}

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
                        <Button className='customerHomebtn' onClick={()=>{SubmitData()}} type='submit' color='primary' variant='contained' style={btstyle}>Let's Go</Button>
                    </span>
                </div>
            </div>
        </>
    )
}
export default CustomerHomepage