import React, { useState, useEffect } from 'react';
import { Form, Input, Button, List } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import ImageList from './ImageList';
import axios from 'axios';
import "../CSS_Files/ItemInfo.css";


// TODO: This is used in many places, can extract into its own file
const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

// Active user login info
const user = JSON.parse(localStorage.getItem("user"));

const AddItem = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [userId, setUserId] = useState("");
    const [image,setImage]= useState("");
    const [imageList, setImageList]= useState([]);
    const [imageSelected, setImageSelected]=useState("");

    useEffect(()=>{

    },[image,imageSelected])
    

     // Use Effect to fetch data info
     useEffect(() => {
        fetch(`/home/${user[0].userId}`).then(response => {
        if(response.status === 200) {
            return response.json()
        }
        }).then(data => {
            setUserId(user[0].userId);
        })
    }, [])
    const navigate = useNavigate();
    

    // Need to prevent default to prevent warning message that form is disconnected
    const navigateHome = (e) => { 
        e.preventDefault()
        navigate(`/home/${user[0].userId}`);
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
                    <img src={imageSelected}></img>
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
                        userId: userId,
                        price: price,
                        description: description,
                        imageUrl: imageSelected,
                        url: url.toString().replace(/(^\w+:|^)\/\//, '')
                    };

                    const response = await api.post('/add', item)

                    if (response.status === 200) {
                        navigate(`/home/${user[0].userId}`)
                    }
                }}>
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}

export default AddItem;

