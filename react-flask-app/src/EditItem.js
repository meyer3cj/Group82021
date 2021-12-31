import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { useNavigate, useParams } from 'react-router-dom';
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
    
    // Used for obtaining the item ID to edit.
    let { itemId } = useParams();

    // Use Effect to fetch data info
    // itemId is a dependency but only need to pass into useEffect optionally
    useEffect((itemId) => {
        fetch(`/item/${itemId}`).then(response => {
        if(response.status === 200) {
            return response.json()
        }
        }).then(data => {
            setName(data[0].name);
            setPrice(data[0].price);
            setDescription(data[0].description);
            setUrl(data[0].url);
        })
    }, [])
    

    // Navigation
    const navigate = useNavigate();

    const navigateHome = () =>{ 
        navigate("/home");
    }

    return(   
        <Form>
            <Form.Field>
                <Input
                    type = "text"
                    value = {name}
                    onChange = {e => setName(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    type = "number"
                    value = {price}
                    onChange = {e => setPrice(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    type = "text"
                    value = {description}
                    onChange = {e => setDescription(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    type = "text"
                    value = {url}
                    onChange = {e => setUrl(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Button onClick={navigateHome}>
                    Home
                </Button>
            </Form.Field>
            <Form.Field>
                <Button onClick={async () => {
                    const item = {
                        itemName: name,
                        price: price,
                        description: description,
                        url: url.toString().replace(/(^\w+:|^)\/\//, '')
                    };

                    const response = await api.post(`/edit/${itemId}`, item)

                    if (response.status === 200) {
                        navigateHome();
                    }
                }}>
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )   
}

export default EditItem;