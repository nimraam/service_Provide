// import logo from './logo.svg';
import './App.css';
import Login from './pages/login/Login';
import {Routes,Route}from 'react-router-dom'
import {Home} from './components/Home'
import RegisterHome from './pages/Register/RegisterHome'
import RegisterCustomer from './pages/Register/Register';
import RegisterCleaner from './pages/Register/RegisterCleaner';
import CustomerHomepage from './components/Cusomer/CustomerHome';
import { SelectService } from './pages/Service/selectService';
import RequestAppoint from './components/Reguest/RequestAppoint';
import CC_Appointments from './components/makeappointment/CC_Appointment';
import CustomerAdmin from './components/Admin/CustomerAdmin'
import {CleanerAvailability} from './components/Cleaner/CleanerAvailablty'
// import { CustomerProfile } from './components/Admin/CustomerProfile';
import { CleanerHomepage } from './components/Cleaner/CleanerHome';
// import { AdminHomepage } from './components/Admin/AdminHome';
import Cleaner from './components/Admin/CleanerTable';
import AdminHomepage from './components/Admin/AdminHome';
import Footer from './components/Navbar/Footer';
import CustomerAppointments from './components/CustomerAppointment';
import CustomerProfile from './components/Cusomer/CustomerProfile'
import { MakeAppointment } from './reducers/appointment';

function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Home/>} />
  {/* ########################## LOgin REGISTER AND REGISTERhoME */}
      <Route exact path='/login' element={<Login/>} />
      <Route path='/register' element={<RegisterHome/>} />
      <Route path='/registerCustomer' element={<RegisterCustomer/>} />
      <Route path='/registerCleaner' element={<RegisterCleaner/>} />

{/* ############################ Customer #################### */}

      <Route path='/Customer' element={<CustomerHomepage/>} />
      <Route path='/Customer/profile' element={<CustomerProfile/>} />
      <Route path='/Customer/appointment' element={<CC_Appointments/>} />


      <Route path='/SelectService/:service/:date' element={<SelectService/>} />
      <Route path='/SelectService/:service/:date/:pemail' element={<RequestAppoint/>} />
      <Route path='/SelectService/:service/:date/:pemail/appointment' element={<CustomerAppointments/>} />
      

     {/* ######################### Admin #########################3  */}
      <Route path='/admin/Customer' element={<CustomerAdmin/>} />
      <Route path='/admin' element={<AdminHomepage/>} />
      <Route path='/admin/Customer' element={<CustomerAdmin/>} />

      <Route path='/admin/profile' element={<CustomerProfile/>} />
      <Route path='/admin/Cleaner' element={<Cleaner/>} />
      {/* <Route path='/admin/Customer/:email/profile' element={<AdminProfile/>} /> */}


            {/* ######################### Cleaner ######################33 */}

      <Route path='/Cleaner' element={<CleanerHomepage/>} />
      <Route path='/Cleaner/profile' element={<CustomerProfile/>} />
      <Route path='/Cleaner/appointment' element={<CC_Appointments/>} />
      <Route path='/Cleaner/availability' element={<CleanerAvailability/>} />
      


    </Routes>

<Footer/>

</>


    
  );
}

export default App;
