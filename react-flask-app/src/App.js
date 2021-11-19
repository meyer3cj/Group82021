import React, { useEffect } from 'react';
import NameList from './names/NameList';
import '../src/App.css'

function App() {
  useEffect(() => {
    fetch('/home').then(res => res.json()).then(data => {
    });
  }, []);

  return (
    <NameList />  
  );
}

export default App;
