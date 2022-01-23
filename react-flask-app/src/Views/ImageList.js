import React, { useState, useEffect } from 'react';
import { Form, Input, Button, List } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../CSS_Files/ItemInfo.css";

export const ImageList=(props) =>{
console.log('component '+props.name)
let propName= props.name
let imageUrls= props.images
const[imageSelection, setImageSelection]= useState("");
useEffect(()=>{
    console.log('useeffect ran on image click. the state is '+ imageSelection)

},[imageSelection])


return(
    <div>
    <List>
        {imageUrls.map(imageUrl=>{
            return(
                <List.Item key= {imageUrl.id}>
                    <img  
                    onClick={e => {
                        e.preventDefault();
                        console.log(imageUrl.id);
                        setImageSelection(imageUrl.url);
                        props.setImageClicked(imageUrl.url);
                    }}
                    src={imageUrl.url} 
                    height= '200px'></img>
                </List.Item>
            )
        })}
    </List>
    
    
    </div>

)
}

export default ImageList