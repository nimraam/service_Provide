import React from 'react'
import Register_bg from '../Admin/Register_bg.jpg';
import { useNavigate } from 'react-router-dom';
import{ Button} from '@material-ui/core';
import AdminNav from '../Navbar/AdminNav';
import './Admin.css';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';



const AdminHomepage = () => {
const {isAuth,role_id}=useSelector((state)=>state.auth)
    const navigate = useNavigate();
    const CleanerPage = () => {
        navigate('/admin/Cleaner');
    }
    const CustomerPage = () => {
        navigate('/admin/Customer');

    }
    useEffect(() => {
        if(isAuth){
            if(role_id=='1'){
              navigate('/Customer')
            }else if(role_id=="2"){
              navigate('/cleaner')
            }else if(role_id=='3'){
              navigate('/admin')
            }
          }  
        window.scrollTo(0, 0)
      }, [])
      const btstyleadmincustomer = {margin:'80px 15% 100px 15%', backgroundColor: '#19C133', fontSize:"18px",width:'20%', height:'80px'}
    
      const btstyleadmincleaner = {margin:'80px 15% 100px 15%', backgroundColor: '#19C133', fontSize:"18px",width:'20%', height:'80px'}
    return(

        <>
        <AdminNav />
        <div className='box' >
            <div className="Inner_box">
                
                <h1 className='lineUp' style={{paddingTop:'30px', fontSize:'60px' ,color: '#19C133'}}>HelpIN</h1>
                <h1 className='lineUp' style={{paddingTop:'30px',fontSize:'40px',color:'black'}}>Welcome Back! Jump right back in...</h1>
                <Button  className='btnadmin' type='submit' color='primary' variant='contained' onClick={CleanerPage} style={btstyleadmincleaner}>Service Provider</Button>
                <Button  className='btnadmin' type='submit' color='primary' variant='contained' onClick={CustomerPage} style={btstyleadmincustomer}>Customers</Button>
                
            </div>
        </div>
        </>
    );
}
export default AdminHomepage