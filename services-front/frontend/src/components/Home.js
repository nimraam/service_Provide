import React, { useEffect } from "react";
import "./Home.css";
import  NavBar  from './Navbar/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import cd from "../images/cd.jpg";
import dd from "../images/dd.jpg";
import cm from "../images/cm.jpg";
import {Button} from "@material-ui/core";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import HomeIcon from "@material-ui/icons/Home";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService";
import PoolIcon from "@material-ui/icons/Pool";
import { Link } from "react-router-dom";
import {useNavigate}from 'react-router-dom'




export const Home = () => {
  const navigate = useNavigate();
    const Login = () => {
        navigate('/Login');
    }
  const btnstylecaro={margin:'8px 0px',background:'#19C133' ,color:'white',fontSize:'18px',width:'150px'};
  const btnstyleabout={margin:'8px 0px ',background:'#19C133' ,color:'white',fontSize:'18px'}
  const bg={backgroundColor:'white'}
  return (
    
    <>
    
     <NavBar />
     <body style={{backgroundColor:'#F6F8FF'}}>
     <Carousel className="bg " style={{fontFamily:"sans-serif"}} >
        <Carousel.Item className="carousel-item">
          <img className="d-block w-100 caroimg" src={cd} alt="First slide" />
          <Carousel.Caption className="carousel-caption">
            
          
            <span className="fo">We</span>
            <span className="sp"></span>
            <span className="fo">help</span>
            <span className="sp"></span>

            <span className="fo">fulfill</span>
            <span className="sp"></span>
            <span className="fo">your</span>
            <span className="sp"></span>
            <span className="fo">domestic</span>
            <span className="sp"></span>
            <span className="fo">hiring</span>
            <span className="sp"></span>
            <span className="fo">needs.</span>
            <span className="sp"></span>
            <br></br>
            <span className="fo">Fast.</span>
            <span className="sp"></span>
            <span className="fo">Reliable.</span>
            <span className="sp"></span>
            <span className="fo">Convenient</span>
            
            <br></br>
            <br></br>
      <Button type="submit"  variant="contained" style={btnstylecaro} className="carobtn lineUp" >
          <Link to='/login' onClick={Login} className="text-decoration-none text-white">Login</Link>
      </Button>
             
         
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <img className="d-block w-100 caroimg" src={cm} alt="First slide" />
          <Carousel.Caption className="carousel-caption">
          <span className="fo">We</span>
            <span className="sp"></span>
            <span className="fo">help</span>
            <span className="sp"></span>

            <span className="fo">fulfill</span>
            <span className="sp"></span>
            <span className="fo">your</span>
            <span className="sp"></span>
            <span className="fo">domestic</span>
            <span className="sp"></span>
            <span className="fo">hiring</span>
            <span className="sp"></span>
            <span className="fo">needs.</span>
            <span className="sp"></span>
            <br></br>
            <span className="fo">Fast.</span>
            <span className="sp"></span>
            <span className="fo">Reliable.</span>
            <span className="sp"></span>
            <span className="fo">Convenient</span>
            <br></br>
            <br></br>
    <Button type="submit" onClick={Login} variant="contained" style={btnstylecaro} className="carobtn lineUp" >
      Login</Button>
             
         
          </Carousel.Caption>
        </Carousel.Item>
       
        
      </Carousel>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Container className="topab" style={bg}>
        <Row style={bg}>
          <Col sm={12} md={6} >
            <img className="abtimg" style={{height:"20px"}} src={dd}></img>
          </Col>
          <Col sm={12} md={6}>
            <Card className="boxab" style={{ width: "25rem" }} >
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted ab" style={{color:'#19c133'}} >
                  --- About Us
                </Card.Subtitle>
                <br></br>
                <Card.Title className="abpro">We Are Professional Cleaning Service Company</Card.Title>
                <br></br>
                <Card.Text>
                HelpIN delivers domestic staffing solutions across Pakistan. We support service providers to register themselves and customers to fulfill their hiring needs via our platform. HelpIN aims to make the hiring process easy, online and convenient. Our national presence allows for a comprehensive suite of flexible and scalable solutions within Pakistan.

                </Card.Text>
                <br></br>
                <br></br>
      
                
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
{/*----------------------------------------- Service Cards---------------------------- */}
<div className="backgr">
   
    <Container style={{backgroundImage:{cd}}}>
    
    <Row >
    <h4 className="what">WHAT WE DO</h4>
    <h1 className="serviceshead">Our Services</h1>
    <h4 className="wha">---</h4>

      <Col>
      <Card className="shad" style={{backgroundColor:"white",boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
        <HomeIcon className="stycard lineUp" />
        <Card.Body>
          <Card.Title className="cardtitle">Home Cleaning</Card.Title>
          <Card.Text className="cardtext">
          HelpIN is committed to create a clean and healthy environment for you and your family. We clean your house and in addition to our exceptional routine cleaning, enhanced disinfection services are available for your home to help ensure your family’s wellness. Our work is fast, efficient, and of exceptional quality that you will not find anywhere else. Wait no longer! We have experienced cleaners who are knowledgeable with every type of flooring and furniture and the most innovative cleaning chemicals available.
          </Card.Text>
          <Button className="bticoncard" variant="contained" color="primary">
            <ArrowForwardIcon />
          </Button>
        </Card.Body>
      </Card>
      </Col>
      <Col>

      <Card className="shad" style={{backgroundColor:"white" ,boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
        <LocalLaundryServiceIcon className="stycard lineUp" />
        <Card.Body>
          <Card.Title className="cardtitle">Laundary Service</Card.Title>
          <Card.Text className="cardtext">
          Never worry about staining your favorite shirt. HelpIN offers professionals that provide laundry, dry cleaning and ironing at a schedule that fits your lifestyle. Our number one consideration is our customer's satisfaction, which is why our professionals take the utmost care of your garments – from expert cleaning to ironing. We want to make sure that we do our best to keep our customers happy.
          <br></br>
          <br></br>
          <br></br>
          </Card.Text>
          <Button className="bticoncard" variant="contained" color="primary">
            <ArrowForwardIcon />
          </Button>
        </Card.Body>
      </Card>
      </Col>
      <Col>

      <Card className="shad" style={{backgroundColor:"white",boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
        <PoolIcon className="stycard lineUp" />
        <Card.Body>
          <Card.Title className="cardtitle">Pool Cleaning</Card.Title>
          <Card.Text className="cardtext">
          HelpIN exists to give pool owners freedom. Let us keep your water sparkling blue and swim-safe, so it’s always ready for you and your friends and family to enjoy. You can rely on us whether you need chemical-only, brush basket, or full-service cleaning. We offer professional individuals in pool cleaning and maintenance services across Pakistan.
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          </Card.Text>
          <Button className="bticoncard" variant="contained" color="primary">
            <ArrowForwardIcon />
          </Button>
        </Card.Body>
      </Card>
      </Col>
      </Row>
      </Container>
      </div>
      </body>

      
    </>
  )
}
