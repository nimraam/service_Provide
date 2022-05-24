import React ,{useEffect}from 'react'
import './SelectService.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';

import {GetServiceProvider}from '../../reducers/serviceReducer'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Button } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowRightAlt';
import {useParams,Link}from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';

export const SelectService = () => {
    
    const {service,date}=useParams()
    const dispatch=useDispatch()
    const {service_getbyname,loading,Error}=useSelector((state)=>state.serviceReducer)
    console.log(service_getbyname);
    useEffect(()=>{
            dispatch(GetServiceProvider({service:service,date:date.replace(/-/g,'/')}))
    },[])
    const btnstyle = { margin: '5% 0px ', background: '#19C133', color: 'white', fontSize: '18px', marginLeft: '34%', height:'60px' }
        // console.log(service_getbyname)
    
    return (
        <>
        <body style={{backgroundColor:'white'}}>
             <div className="Banner_wrapper">
                <div className="Banner_overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="Banner_heading">
                                <div className="line">
                                    <h1 className='lineUp'>Cleaner Profiles</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <Container>
                <Row>
                    <h1 className='service_heading'>Choose Your Cleaner</h1>
                </Row>
            </Container>
            { service_getbyname?(  
            
    <Container style={{marginTop:'5%',marginLeft:'10%'}} >
            <Row>{service_getbyname?(<>{service_getbyname?.map((ele)=>{
                    return(  <Col>
                      <Card className="card" style={{ width: "30rem" }}>
                          <Row className='cle'>
                          <Col >
                              <h5  className='cleaner' >Name: {ele.username}</h5>
                              <h4  className='cleaner' >Hourly Rate: ${ele.hourlyrate}</h4>
                              <h4  className='cleaner' >Service: {ele.service_name}</h4>

                              <Button className="service_btn" variant="contained" color="primary"><Link to={`${ele.email}`} ><ArrowForwardIcon/></Link></Button>
                          </Col>
      
                              <Col>
                                  <AccountCircleIcon  className='iconsforprofile'/>
                              </Col>
                          
                          </Row>
                          
                      </Card>
                  </Col>)
                })}
         </> ):(<h1 className='text-center' > No service is Available </h1>)}
            

            

            </Row>
            
            
                
                
                        
            </Container>):(<h1 className='text-center' > No service is Available </h1>)}
          
            <Button type="submit" variant="contained" style={btnstyle} className="loginbtn">
            <Link className='text-decoration-none text-white' to='/Customer' >Go Back</Link>
            </Button>
            
            </body>
        </>
    )
}
