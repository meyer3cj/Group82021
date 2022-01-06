import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../CSS_Files/ItemInfo.css";


// TODO: This is used in many places, can extract into its own file
const api = axios.create({
    baseURL: 'http://localhost:3000/'
})
let iName='';
const AddItem = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [userId, setUserId] = useState("");
    const [image, setImage]= useState("");

     // Use Effect to fetch data info
     /* TODO: When we create login feature need to obtain userId from login
        Currently hard codes userId to be 1 */
     useEffect(() => {
        fetch(`/home`).then(response => {
        if(response.status === 200) {
            return response.json()
        }
        }).then(data => {
            setUserId(1);
        })
    }, [])
    
    const navigate = useNavigate();

    // Need to prevent default to prevent warning message that form is disconnected
    const navigateHome = (e) => { 
        e.preventDefault()
        navigate("/home");
    }
    return(
        <Form className = "formView">
            <Form.Field className = "inputContainer">
                <Input
                    className='input'
                    id= 'itemName' 
                    type = "text"
                    placeholder = "Item Name"
                    value = {name}
                    onChange = {e => setName(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Button onClick={async () => {
                    const item = {
                        itemName: name,


                    };
                    console.log(item);
                    const response = await api.post('/getitemName', item);


                }}>
                    Hello
                </Button>
            </Form.Field>          
            <Form.Field>
                 <Button onClick= {async() =>{console.log(itemName.value())}}>Hello</Button>            
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
                        url: url.toString().replace(/(^\w+:|^)\/\//, ''),
                        image: image,

                    };

                    const response = await api.post('/add', item);

                    if (response.status === 200) {
                        navigate("/home")
                    }
                }}>
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}

export default AddItem;