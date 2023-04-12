import React, {useRef,useState} from 'react'
import Form from 'react-bootstrap/Form';
import '../style/slider.scss'

const ConfidenceSlider = (props) => {
    const [confidence, setConfidence] = useState(50)
    const rangeRef = useRef(null)
    const inputRef = useRef(null)
    const checkRef = useRef(null)
    const changeConfidence = (e) => {
        
        if (e.target.className === "form-range"){
            setConfidence(confidence=>rangeRef.current.valueAsNumber)
            props.setConfidenceRange(confidence * 0.01)
        }
        if (e.target.className === "form-control"){
            setConfidence(confidence=>inputRef.current.valueAsNumber)
            props.setConfidenceRange(confidence * 0.01)

        }

        
    }
    const setEnabled = (e) => {

        if (checkRef.current.checked){
            inputRef.current.disabled = false
            rangeRef.current.disabled = false
        }else{
            inputRef.current.disabled = true
            rangeRef.current.disabled = true
        }
        
    }
  return (
    <div className="slider-container">
        <Form>
        <div className="slider-sub-container-1">

        <Form.Label style={{"color": "#5F879D"}}>Highlight Transcription Confidence</Form.Label>
        <Form.Check ref={checkRef} onClick ={setEnabled}style={{"color": "#5F879D"}}
        type="switch"
        id="custom-switch"
      
            />
        </div>
        <div className="slider-sub-container-2">
        <Form.Range disabled ref={rangeRef} onChange={changeConfidence} value= {confidence}  style={{"color": "#5F879D"}}/>
        <Form.Control disabled type = {"number"} ref={inputRef} onChange = {changeConfidence} value={confidence}  style={{"width": "54px", "height": "28px","fontSize": "8px"}}
       
       
         />
          <span>%</span>
        </div>
      
      </Form>
       </div>
  )
}

export default ConfidenceSlider