import React, {useState} from 'react'
import file from "../../storage/911"

import jsonFiles from "../helper/localJSONImporter"

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
const Search = () => {

  let [results, setResults] = useState([])
  const search = (e) => {
    let query = e.target.value

   // let data = JSON.parse(file)
   setResults([])
    console.log(e)
   if(e.target.value === ""){
    setResults([])

    return
   }
   let temp = []
   for (let i in jsonFiles){

    if (jsonFiles[i].results.transcripts[0].transcript.includes(e.target.value)){
      console.log(jsonFiles[i].results.transcripts[0])
       temp = [...temp, jsonFiles[i].jobName]
      console.log(temp)
     
        setResults(
          [
           ...temp
          ]
        )
    }
   }

   console.log(jsonFiles)


  }
  return (
    <div className="home-container">
      <input onChange={search} type="search" style={{"marginTop": "0.5rem",}}className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
      {results ? results.map((filename) => 
          <MDBNavbarLink href={'/?file=' + filename }>{filename}</MDBNavbarLink>
       
) : null}
  
            </div>
  )
}

export default Search