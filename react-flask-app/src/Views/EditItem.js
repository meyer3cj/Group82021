import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Image } from 'semantic-ui-react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageList from './ImageList';
import axios from 'axios';

// TODO: This is used in many places, can extract into its own file
const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

const EditItem = () => {
    // Hooks for setting and using user inputted information.
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
<<<<<<< HEAD
    const [image, setImage]= useState("");
    const [originalImage,setOriginalImage]= useState("");
    const [imageList, setImageList]= useState([]);
    const [imageSelected, setImageSelected]=useState("");    
=======

    // Active user login info
    const user = JSON.parse(localStorage.getItem("user"));
    
>>>>>>> 0bc6ef6 (Added login page functionality with 401 Exception if login credentials)
    // Used for obtaining the item ID to edit.
    let { itemId } = useParams();

    // Use Effect to fetch data info
    useEffect(() => {
        fetch(`/${itemId}/item`).then(response => {
        if(response.status === 200) {
            return response.json()
        }
        }).then(data => {
            setName(data[0].name);
            setPrice(data[0].price);
            setDescription(data[0].description);
            setUrl(data[0].url);
            setOriginalImage(data[0].image)

        })
    }, [itemId])
    

    // Navigation
    const navigate = useNavigate();

    // Need to prevent default to prevent warning message that form is disconnected
    const navigateHome = (e) => {
        e.preventDefault();
        navigate(`/${user[0].userId}/home`);
    }

    return(   
        <Form className = "formView">
            <Form.Field className = "inputContainer">
                <Input
                    type = "text"
                    value = {name}
                    onChange = {e => setName(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
            <Image src= {originalImage}/> <br></br>
            <Button onClick={async () => {
                    
                    let itemName= name;

                    const response = await api.get(`/getitemName/${itemName}`, itemName)
                    let imageUrls= []
                    for(let i=0; i< response.data.length; i++){
                        imageUrls.push(response.data[i])
                    }
                  
                    setImage(itemName)
                    setImageList(imageUrls)
}}>Change Image</Button>

            </Form.Field> 
            <Form.Field>
                <div id='images'>
                    <ImageList 
                    name={image} 
                    images={imageList}
                    setImageClicked={imageSelected => setImageSelected(imageSelected)}
                    />
                    <h2>Original Image</h2>
                    <Image src={originalImage}></Image>
                    <h2>Selected Image</h2>
                    <Image src={imageSelected}></Image>
                </div>
            </Form.Field>                           
            <Form.Field className = "inputContainer">
                <Input
                    type = "number"
                    value = {price}
                    onChange = {e => setPrice(e.target.value)}
                />
            </Form.Field>
            <Form.Field className = "inputContainer">
                <Input
                    type = "text"
                    value = {description}
                    onChange = {e => setDescription(e.target.value)}
                />
            </Form.Field>
            <Form.Field className = "inputContainer">
                <Input
                    type = "text"
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
                        price: price,
                        description: description,
                        imageUrl: imageSelected,
                        url: url.toString().replace(/(^\w+:|^)\/\//, '')
                    };

                    const response = await api.post(`/${itemId}/edit`, item)

                    if (response.status === 200) {
                        navigate(`/${user[0].userId}/home`)
                    }
                }}>
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )   
}

export default EditItem;