import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import NameList from './names/NameList';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
 
  
  
  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);
  return (
   
        <div>
        <NameList/>
        <button>add</button>
        
       
        </div>
    
  );
}

export default App;
