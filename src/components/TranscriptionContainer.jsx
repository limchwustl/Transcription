import React, {useState,useEffect,useRef} from 'react'
import awsData from '../../storage/trump.json'
import "../style/transcriptionBox.scss"
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Segment from './Segment'


const TranscriptionContainer = (props) => {
    const transcriptRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(-1)
    console.log(props.data)
    const handleClick = (i) => {

      let audio = props.audioRef.current.audio.current
      audio.currentTime = props.data[i].startTime
      audio.play()

    }
    useEffect(() => {
      const transcriptEl = transcriptRef.current;
     
      if (transcriptEl.children){
        const activeEl = transcriptEl.children[activeIndex];
        if (activeEl) {
          activeEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
    }, [activeIndex]);
 
  
    useEffect(() => {
  
        const handleTimeUpdate = () => {
            const currentTime = props.audioRef.current.audio.current.currentTime
            const index = props.data.findIndex(
                ({ startTime, endTime }) => currentTime >= startTime && currentTime <= endTime

              );
             
              setActiveIndex(index);
      
        };

  
    
        const intervalId = setInterval(handleTimeUpdate, 100);
        return () => clearInterval(intervalId);
      },[props.audioRef,props.data])


  return (
    <div className = "transcription-container"  ref={transcriptRef}>



      {props.data ? props.data.map((item, i) => 
         
        <React.Fragment key = {Math.random() + "frag"}>
          
 
       

         <div  onClick={() => handleClick(i)}>
        <Segment  confidenceRange={props.confidenceRange}className={i === activeIndex ? 'yellow' : 'transparent'} sentence = {item} />
        
        </div>



            
        
                </React.Fragment>
        ):null}
       

      
      
    </div>
  )
}

export default TranscriptionContainer