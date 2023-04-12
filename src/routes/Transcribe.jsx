import React, {useRef}from 'react'

const Transcribe = () => {
    const ref = useRef();
    // var path = (window.URL || window.webkitURL).createObjectURL(file);
    // console.log('path', path);
    function get() {
        console.log(ref)
    }
  return (
    <div className="home-container">
<form ref={ref} action="get()">
  <input type="file" id="myFile" name="filename"/>
  <input type="submit"/>
</form>
<button className="button-2" role="button">Transcribe!</button>
        </div>
  )
}

export default Transcribe