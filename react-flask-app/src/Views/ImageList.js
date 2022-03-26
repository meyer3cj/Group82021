import React, { useState, useEffect } from 'react';
import { List, Image } from 'semantic-ui-react';


export const ImageList=(props) =>{
    let imageUrls = props.images
    const[imageSelection, setImageSelection] = useState("");
    useEffect(() => {
    },[imageSelection])

    return(
        <List className='imageList'>
            {imageUrls.map(imageUrl=>{
                return(
                    <List.Item className = 'image' key= {imageUrl.id}>
                        <Image  
                            onClick={e => {
                                e.preventDefault();
                                setImageSelection(imageUrl.url);
                                props.setImageClicked(imageUrl.url);
                                e.target.style.display = 'imageUrl.id'
                            }}
                            src={imageUrl.url} 
                        />
                    </List.Item>
                )
            })}
        </List>
    )
}

export default ImageList