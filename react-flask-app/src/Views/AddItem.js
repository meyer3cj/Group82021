import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import ImageList from './ImageList';
import axios from 'axios';
import "../CSS_Files/ItemInfo.css";


// TODO: This is used in many places, can extract into its own file
const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

const AddItem = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [image,setImage]= useState("");
    const [imageList, setImageList]= useState([]);
    const [imageSelected, setImageSelected]=useState("");

    // Need to get user data for navigation
    const user = JSON.parse(localStorage.getItem("user"));
    const usersId = user[0].userId;

    useEffect(()=>{

    },[image,imageSelected])
    
    const navigate = useNavigate();
    

    // Need to prevent default to prevent warning message that form is disconnected
    const navigateHome = (e) => { 
        e.preventDefault()
        navigate(`/${usersId}/home`);
    }

    return(
        <Form className = "formView">
            <Form.Field className = "inputContainer">
                <Input
                    className='input'
                    type = "text"
                    placeholder = "Item Name"
                    value = {name}
                    onChange = {e => setName(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Button onClick={async () => {
                    
                    let itemName= name;

                    const response = await api.get(`/getitemName/${itemName}`, itemName)
                    let imageUrls= []
                    for(let i=0; i< response.data.length; i++){
                        imageUrls.push(response.data[i])
                    }
                  
                    setImage(itemName)
                    setImageList(imageUrls)
}}>
                    Search Images
                </Button>
            </Form.Field>
            <Form.Field>
                <div id='images'>
                    <ImageList 
                    name={image} 
                    images={imageList}
                    setImageClicked={imageSelected => setImageSelected(imageSelected)}
                    />
                    <h2>Selected Image</h2>
                    <img src={imageSelected} alt="" />
                </div>
            </Form.Field>
            <Form.Field className = "inputContainer">
                <Input
                    className='input'
                    type = "number"
                    placeholder = "Price"
                    value = {price}
                    onChange = {e => setPrice(e.target.value)}
                />
            </Form.Field>
            <Form.Field className = "inputContainer">
                <Input
                    className='input'
                    type = "text"
                    placeholder = "Description"
                    value = {description}
                    onChange = {e => setDescription(e.target.value)}
                />
            </Form.Field>
            
            <Form.Field className = "inputContainer">
                <Input
                    className='input'
                    type = "text"
                    placeholder = "url"
                    value = {url}
                    onChange = {e => setUrl(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Button className = "homeButton" onClick={navigateHome}>
                    Home
                </Button>
                <Button className = "submitButton" onClick={async () => {
                    const item = {
                        itemName: name,
                        usersId: usersId,
                        price: price,
                        description: description,
                        imageUrl: imageSelected,
                        url: url.toString().replace(/(^\w+:|^)\/\//, '')
                    };

                    if (name === "") {
                        alert("Please enter a name");
                    } else if (price === "") {
                        alert("Please enter a price");
                    } else if (url === ""){
                        alert("Please enter a url");
                    }else{                   

                    const response = await api.post('/add', item)

                    if (response.status === 200) {
                        navigate(`/${usersId}/home`)
                    }
                }}}>
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}

export default AddItem;

