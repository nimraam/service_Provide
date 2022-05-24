import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Footer.css'
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import CopyrightIcon from '@material-ui/icons/Copyright';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MailIcon from '@material-ui/icons/Mail';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CallIcon from '@mui/icons-material/Call';
import Form from 'react-bootstrap/Form';

import {  Button} from "@material-ui/core";

const btnstylefoot={margin:'8px 0px ',background:'#19C133' ,color:'white',fontSize:'18px'}

const Footer=()=>{
    return(
    <>
    <div className="foot">
     <Container>
         <Row>
             <Col sm={12} md={4}>
              <Card className="cardfoot">
              <Card.Title className="titlefoot"><HomeWorkIcon className="styfoot"/>Our Office</Card.Title>
              <Card.Text className="textfoot">Phone & E-mail

</Card.Text>
              <Card.Text className="textfoot"><MailIcon/> sales@helpin.com</Card.Text>
              <Card.Text className="textfoot"><CallIcon/> 0323-2118312</Card.Text>

              </Card>

             </Col>
             <Col sm={12} md={4}>
             <Card className="cardfoot li" style={{align:'justify'}}>
              <Card.Title style={{margin:'10%'}} className="titlefoot"> Operating hours:
</Card.Title>
              
              <Card.Text  > <ArrowForwardIosIcon className="arrowfoot"/> <a className="linkfoot" style={{textDecoration:'none'}}  href="#">Monday – Friday 10am – 7pm</a>
</Card.Text>
              <Card.Text  > <ArrowForwardIosIcon className="arrowfoot"/> <a className="linkfoot" style={{textDecoration:'none'}}  href="#">Saturday 10am- 5pm</a></Card.Text>
              <Card.Text  > <ArrowForwardIosIcon className="arrowfoot"/> <a className="linkfoot" style={{textDecoration:'none'}}  href="#">Sunday 12am-4pm</a></Card.Text>


              </Card>
             </Col>
             <Col sm={12} md={4}>
               <Card className="cardfoot" >
                   <Card.Title style={{marginTop:'10%',marginBottom:'5%'}} className="titlefoot">
                   Office Location:

                   </Card.Title>
              <Card.Text className="textfoot">F-69, lane 4 block 4, Clifton, Karachi</Card.Text>
   


               </Card>
             </Col>

         </Row>
     </Container>
    </div>
    <div className="footer">
    <Col  className="contentfoot" style={{marginLeft:'5%',marginTop:'2%'}}>
    2020 <CopyrightIcon className="icofoot"/>  Copyright
    </Col>
     <Col className="mobfoot" style={{marginLeft:'40%'}}>
     <WhatsAppIcon className="iconfoot" />
     <FacebookIcon className="iconfoot" />
     <MailIcon className="iconfoot" />
     <TwitterIcon  className="iconfoot"/>
     <InstagramIcon className="iconfoot" />

     </Col>
    </div>

    </>
    )
}

export default Footer;