import React, {useEffect, useState, useContext} from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse
  } from 'mdb-react-ui-kit';
import '../style/nav.scss'
import axios from 'axios'

const Nav = () => {
    const [showNavSecond, setShowNavSecond] = useState(false);


    
  return (
    <div className="nav-container">
      <MDBNavbar expand='lg' dark bgColor='#5F879D'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>Confidence Scores</MDBNavbarBrand>
       
        <MDBCollapse navbar show={showNavSecond}>
          <MDBNavbarNav>
        
            <MDBNavbarLink href='transcribe'>Transcribe</MDBNavbarLink>
            <MDBNavbarLink href='search'>Search</MDBNavbarLink>
            
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </div>

    
  )
}

export default Nav