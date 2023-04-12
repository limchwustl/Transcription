import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Nav from './components/Nav'
import Home from './routes/Home'
import Transcibe from './routes/Transcribe'
import Search from './routes/Search'
import './style/app.scss'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {


  return (
    <MDBContainer style={{ "maxWidth": '100%' }}>
      <Router>
      <Nav/>
      <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/transcribe" element = {<Transcibe/>}/>
      <Route path = "/search" element = {<Search/>}/>
      </Routes>
      </Router>
    </MDBContainer>
  )
}

export default App
