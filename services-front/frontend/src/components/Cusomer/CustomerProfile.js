import React from 'react'
import  NavBarCustomer  from '../Navbar/CustomerNav';
import './CustomerProfile.css';
import AdminNav from '../Navbar/AdminNav';
import {NavBarCleaner}from '../../components/Navbar/CleanerNav'
import Col from 'react-bootstrap/Col'
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import { Button} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import {useSelector,useDispatch}from 'react-redux'
import {GetCustomerby_Email}from '../../reducers/CustomerReducer'
import {logout}from '../../reducers/authReducer'
const CustomerProfile = () => {
    const dispatch=useDispatch()
    const {isAuth,token,email,role_id}=useSelector((state)=>state.auth)
    const {Get_customer_Email}=useSelector((state)=>state.CustomerReducer)
    const navigate = useNavigate();
    const logoutfuction = () => {
        dispatch(logout())
        navigate('/')
    }
    useEffect(() => {
        if(!isAuth){
            navigate('/')
        }
        window.scrollTo(0, 0)
        dispatch(GetCustomerby_Email({email}))
      }, [])
      const btnstyleedit={margin:'8px 0px ',background:'#19C133' ,color:'white',fontSize:'15px',marginLeft:'2%',marginTop:'5%',marginBottom:'5%'}
      const btnstylelogout={margin:'8px 0px ',background:'#19C133' ,color:'white',fontSize:'15px',marginLeft:'2%',marginTop:'5%',marginBottom:'5%'}

  return (
    <>
    {role_id=='1'?<NavBarCustomer/>:null}
    {role_id=='2'?<NavBarCleaner/>:null}
    {role_id=='3'?<AdminNav/>:null}
 
    <body style={{backgroundColor:'#F6F8FF'}}>
             <div class="Banner_wrapper">
                <div class="Banner_overlay"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="Banner_heading">
                                <div class="line">
                                    <h1 class='lineUp'>Account</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <Container>
                <Row>
                    <Col >
                        <h1 className='edit'>Account Details</h1>
                    </Col>
                </Row>
            </Container>
            <Container >
            <Row>
            <Col >
                <Card className='profile_card'>
                    <Row className='ed' >
                    <Col >
                        <h3  className='edita' >Name: {Get_customer_Email.username}</h3>
                        <h4  className='edita' >Email: {Get_customer_Email.email}</h4>
                        <h4  className='edita' >Address : {Get_customer_Email.address}</h4>
                    </Col>
                        <Col>
                            <AccountCircleIcon  className='iconsedit'/>
                        </Col>
                    </Row>  
                </Card>
            </Col>
            </Row>      
            </Container>
            <div className="btncleanerhome">
            <div className="btned">
            {/* <Button type="submit"  variant="contained"  style={btnstyleedit} className="editbtn">Edit</Button> */}
      <Button type="submit"  variant="contained" onClick={()=>{
          logoutfuction()}} style={btnstylelogout} className="editbtn">Logout</Button>
            </div>
            </div>
            </body>
    </>
  )
}

export default CustomerProfile