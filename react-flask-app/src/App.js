import React, { useState, useEffect } from 'react';
import NameList from './names/NameList';
import NameList2 from './names/NameFile2';
import '../src/App.css'

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch("/home").then(response => {
      if(response.status == 200) {
        return response.json()
      }
    }).then(data => setItems(data))
  }, [])

  return (
    <NameList2 items={items}/>  
  );
}

export default App;
