import React, {useState, useRef,useEffect} from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss'
import axios from "axios";
import "../style/home.scss"
import ReactSearchBox from "react-search-box";
import TranscriptionContainer from '../components/TranscriptionContainer'
import ConfidenceSlider from '../components/ConfidenceSlider'
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdb-react-ui-kit';
import jsonFiles from "../helper/localJSONImporter"


import { MDBRadio } from 'mdb-react-ui-kit';

const Home = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const filename = queryParameters.get("file")
  const [time, setTime] = useState(new Date());
  const [currentTime,setCurrentTime] = useState(0.0)
  const [alternativeIndex, setAlternativeIndex] = useState(1)
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [confidenceRange, setConfidenceRange] = useState(0.5)
  const audioRef = useRef(null);
  const radioRef = useRef(null);

  const [sentences, setSentences] = useState([])
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
  const get = () =>{
    
    if (radioRef.current[0].checked){
      setAlternativeIndex((alternativeIndex)=>1)
    }
    if (radioRef.current[1].checked){
      setAlternativeIndex((alternativeIndex)=>2)
    }
    if (radioRef.current[2].checked){
      setAlternativeIndex((alternativeIndex)=>3)
    }
  }
  async function fetchFile () {
    const response = await fetch(`../../storage/${filename}.json`)
    const json = await response.json()
    let result = json.results.segments
   
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]+/
    var sentence = []
    var words = []
    var times = []

    for (let i in result){
        console.log(alternativeIndex)
        let curSegment = result[i].alternatives[alternativeIndex] ? result[i].alternatives[alternativeIndex].items : result[i].alternatives[0].items
       
        for (let j in curSegment){
            let curWord = curSegment[j].content
        
           let startTime = parseFloat(curSegment[j].start_time)
           let endTime = parseFloat(curSegment[j].end_time)
        
            times.push(startTime)
            times.push(endTime)
            sentence.push(curWord)
            words.push(curSegment[j])
          
            if (format.test(curWord.slice(-1))){
                let curSentence = sentence.join(curWord)
                
                curSentence += " "
                let curWords = [...words]
                times = times.filter(Number)
                times.sort()
                let curTimes = times.slice()
                
                setSentences(sentences=>([
                    ...sentences,
                    {
                            "text" : curSentence,
                            "listWords" : curWords,
                            "startTime" : curTimes[0],
                            "endTime" : curTimes.slice(-1)[0]
                      
                    
                    
                    }
                ]))

                sentence = []
                words = []
                times = []
            }
        }
       
    

    }


}

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a request to the server with the prompt
    axios
      .post("http://localhost:8001/chat", { prompt })
      .then((res) => {
        // Update the response state with the server's response
        setResponse(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
 
  
  useEffect(() => {
   
    setSentences((sentences)=>[])
    fetchFile()
    
  }, [alternativeIndex]);
    
  return (
    <div className="home-container">
      
      <div className="utility-container">
      <form ref={radioRef} onChange={get}> 

      <MDBRadio name='inlineRadio' id='inlineRadio1' value='option1' label='1' inline />
      <MDBRadio name='inlineRadio' id='inlineRadio2' value='option2' label='2' inline />
      <MDBRadio name='inlineRadio' id='inlineRadio3' value='option3' label='3' inline />

      </form>
      
      <MDBPopover size='sm' color='success' 
                btnChildren='Click Here to toggle'>
                <MDBPopoverHeader>MDBootstrap</MDBPopoverHeader>
                <MDBPopoverBody>{response}</MDBPopoverBody>
            </MDBPopover>
     
    
        <div>
      
                
    </div>
        <div className="audio-container">
         <AudioPlayer
              ref={audioRef}
            
              src= {"../../storage/" + filename +  ".mp3"}
              style={{ borderRadius: "1rem",  rhapThemeColor: "#865386" }}
              onListen={e=>{
              setCurrentTime(currentTime=>e.timeStamp)
         
            }
              
                }
              // other props here
            />

        </div>
         
          <ConfidenceSlider setConfidenceRange={setConfidenceRange}/>
  
  
      </div>
      <div className="input-group">
  <input type="search" style={{"marginTop": "0.5rem",}}className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button type="button" style={{"color": "#5F879D"}} className="btn btn-outline-primary">search</button>
</div>

      {sentences !== [] ? <TranscriptionContainer data = {sentences} confidenceRange = {confidenceRange} currentTime={currentTime} audioRef = {audioRef}/> : null}
  
    </div>
  )
}

export default Home