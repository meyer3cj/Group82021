import React, {Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import items from '../../src/items.json'



class NameList extends Component {
  
    handleClick = () => {
        console.log("delete" ,this.props);
      }
  render() {
      const divstyle = {
          padding: "20px",
        
          
      }
      const liststyle={
        display:'flex',
        justifyContent:'center',
    
    
    }
      const itemdiv={
            
          border:'2px solid #ff0000',
            borderRadius: '4px',
            minWidth:'20%',width:'30%',
            margin: '2px',
        }
    return(
            
    <div>
        <h1>Hello There </h1>   
        <div style={divstyle}>

                {items.map((item, index)=>{return(
                <div style={itemdiv}>
                    <div>
                    <h3>{item.name}</h3>
                    <p style={{}}>{item.price}</p>
                    </div>
                    <p>{item.description}</p>
                    <button onClick={this.handleClick}>edit</button>
                    <a href={item.url} target="_blank">Go to Listing</a>
                    <button>delete</button>
                </div>
                )})}
                
           
        </div>
        </div> 
        
        )
    
    }   

}

export default NameList;


    
    