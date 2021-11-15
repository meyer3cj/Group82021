import React, {Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import items from '../../src/items.json';
import '../../src/names/list.css';
import axios from 'axios';


const api= axios.create({
    baseURL: `http://localhost:5000/`
})

class NameList extends Component {
  

      
    
  render(){
      const itemstyle={
        border: '2px solid black',
        marginBottom:'20px',
        boxShadow:'2px 2px 4px 6px white',
        width: '80%',
        marginLeft: '10%',
        backgroundColor:'rgb(220,220,220'
        
        }

        
       
        const linkstyle= {
            
            textDecoration:'none'


        }
    return(
            
    <div>
        
        <div>

                {items.map((item, index)=>{return(
                <div class='item'style={itemstyle}>
                    <div>
                    <p>{item.id.toString()}</p>
                    <h3><a class='link' style={linkstyle} href={item.url}target="_blank">{item.name}</a></h3>
                    <p><b>{item.Store}</b></p>
                    <p>{item.price}</p>
                    </div>
                    <p>{item.description}</p>
                    <button onClick={this.handleClick}>edit</button>
                    <button onClick= {()=>{
                        fetch('/del/'+item.id,{'method':'DELETE'})
                        console.log(item.id+' completed')
                        
                        }}>delete</button>

                    
                    
                </div>
                )})}
                
           
        </div>
        </div> 
        
        )
    
    }   

}

export default NameList;


    
    