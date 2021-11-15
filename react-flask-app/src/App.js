import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import NameList from './names/NameList';
import '../src/App.css'

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const liststyle= {
    marginLeft:"10px",
    padding:'10px',

  }
  
  
  useEffect(() => {
    fetch('/home').then(res => res.json()).then(data => {
    
    });
  }, []);
  return (
        
        <div>
        <div style={liststyle}>
          <div>
          <NameList/>
        </div>
        
       
        </div><button>add</button>
    </div>
  );
}

export default App;
