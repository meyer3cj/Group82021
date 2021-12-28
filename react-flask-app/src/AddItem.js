import React, { useState } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// TODO: This is used in many places, can extract into its own file
const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

const AddItem = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    const navigate = useNavigate();

    const navigateHome = () =>{ 
        navigate("/home");
    }

    return(
        <Form>
            <Form.Field>
                <Input 
                    placeholder = "Item Name"
                    value = {name}
                    onChange = {e => setName(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    placeholder = "Price"
                    value = {price}
                    onChange = {e => setPrice(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    placeholder = "Description"
                    value = {description}
                    onChange = {e => setDescription(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    placeholder = "url"
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
                        url: url.replace(/(^\w+:|^)\/\//, '')
                    };

                    const response = await api.post('/add', item)

                    if (response.status == 200) {
                        navigateHome();
                    }
                }}>
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}

export default AddItem;