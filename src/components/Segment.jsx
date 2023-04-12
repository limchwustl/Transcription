import React, {useState,useEffect} from 'react'
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const Segment = (props) => {

 
  useEffect(() => {
 
    
  }, [props.confidenceRange]);
 
  return (
    
<>
<p key = {props.sentence.text + Math.random()} style={{"zIndex": 1}}>

                {props.sentence ? props.sentence.listWords.map((word)=>{

                        return  <OverlayTrigger key={Math.random() + "overlayTrigger"}  placement="bottom" overlay={
                        
                            <Popover id="popover">
                         
                            <Popover.Body>
                            {"Confidence Score: " + word.confidence}
                            </Popover.Body>
                            </Popover>
                        }> 
                        
                            
                        
                            
                        
                        <span style= {{ "backgroundColor": `${props.className}`,"color": "rgba(0,151,19," + 1 * (word.type === "punctuation" || word.confidence < props.confidenceRange ? 1.0 : word.confidence) + ")" }}  key= {word.content + Math.random()}>{word.type !== "punctuation" && word.confidence < props.confidenceRange ? "_______" : word.content + " "}
                        </span>
                        </OverlayTrigger>
                    
                    

                }) : null}
                
                </p>
 </>
  )
}

export default Segment