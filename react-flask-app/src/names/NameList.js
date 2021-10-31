import React, {Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import names from '../../src/names.json'


class NameList extends Component {
  
  render() {

    return(
    
        <div>
            <h1>
                Hello There
                {names.map((PersonName, index)=>{return<div><h1>{PersonName.id}</h1><p>{PersonName.name}</p></div>})}
                
            </h1>
        </div>
        
        )
    
    }   

}

export default NameList;


    
    