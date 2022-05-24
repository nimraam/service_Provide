import React from 'react'
// import Register_bg from './images/Register_bg.jpg';
import { useNavigate } from 'react-router-dom';
import{ Button} from '@material-ui/core';
import NavBar from '../../components/Navbar/Navbar'
import './Register.css';



 const Register = () => {
    const navigate = useNavigate();
    const registerCleanerPage = () => {
        navigate('/RegisterCleaner');
    }
    const registerCustomerPage = () => {
        navigate('/RegisterCustomer');

    }
      
    const btstyle = {margin:'80px 15% 100px 15%', backgroundColor: '#19C133', fontSize:"18px",width:'20%', height:'80px'}
    return(
        <>
        <NavBar />
        <div className='box' >
            <div className="Inner_box">
                
                <h1 className='lineUp' style={{paddingTop:'30px', fontSize:'60px' ,color: '#19C133'}}>HelpIN</h1>
                <h1 className='lineUp' style={{paddingTop:'30px',fontSize:'40px',color:'black'}}>Are you a Service Provider or a Customer?</h1>
                <Button  className='registerbtnhome' type='submit' color='primary' variant='contained' onClick={registerCleanerPage} style={btstyle}>Cleaner</Button>
                <Button  className='registerbtnhome' type='submit' color='primary' variant='contained' onClick={registerCustomerPage} style={btstyle}>Customer</Button>
                
            </div>
        </div>
        </>
    );
}

export default Register