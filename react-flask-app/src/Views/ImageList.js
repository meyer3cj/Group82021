import React, { useState, useEffect } from 'react';
import { Form, Input, Button, List, Image } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import "../CSS_Files/ListStyle.css"
import axios from 'axios';

export const ImageList=(props) =>{
let propName= props.name
let imageUrls= props.images
const[imageSelection, setImageSelection]= useState("");
useEffect(()=>{
},[imageSelection])


return(
    
    <List className='imageList'>
        {imageUrls.map(imageUrl=>{
            return(
                <List.Item class = 'image' key= {imageUrl.id}>
                    <Image  
                    onClick={e => {
                        e.preventDefault();
                        setImageSelection(imageUrl.url);
                        props.setImageClicked(imageUrl.url);
                    }}
                    src={imageUrl.url} 
                    height= '200px'></Image>
                </List.Item>
            )
        })}

    </List>
    
    
    
)
}

export default ImageList