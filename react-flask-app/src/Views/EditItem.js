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
    const [image, setImage]= useState("");
    const [originalImage,setOriginalImage]= useState("");
    const [imageList, setImageList]= useState([]);
    const [imageSelected, setImageSelected]=useState("");   
    
    // Active user login info
    const user = JSON.parse(localStorage.getItem("user"));
    const usersId = user[0].userId;

    // Used for obtaining the item ID to edit.
    let { itemId } = useParams();

    // Use Effect to fetch data info
    useEffect(() => {
        fetch(`/${usersId}/${itemId}/item`).then(response => {
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
    }, [usersId, itemId])
    

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
            </Form.Field> 
            <Form.Field></Form.Field>
            <Button 
                className='btn'
                onClick={async () => {
                    
                    let itemName = name;

                    const response = await api.get(`/getitemName/${itemName}`, itemName)
                    let imageUrls = []
                    for (let i = 0; i < response.data.length; i++) {
                        imageUrls.push(response.data[i])
                    }
                  
                    setImage(itemName)
                    setImageList(imageUrls)
            }}>Change Image</Button>

            
            <Form.Field>
                <div id='images'>
                    <ImageList 
                    name={image} 
                    images={imageList}
                    setImageClicked={imageSelected => setImageSelected(imageSelected)}
                    />
                    <h2
                        className='text'
                    >
                        Selected Image
                    </h2>
                    <Image 
                        className='imageSelected'
                        src={imageSelected}
                        onError={e => e.target.style.display = 'none'}
                        onLoad={e => e.target.style.display = ''}
                        alt="" 
                    />
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
                <Button className = "btn" onClick={navigateHome}>
                    Home
                </Button>
                <Button className = "btn" onClick={async () => {
                    const item = {
                        itemName: name,
                        price: price,
                        description: description,
                        imageUrl: imageSelected,
                        url: url.toString().replace(/(^\w+:|^)\/\//, '')
                    };

                    const response = await api.post(`/${usersId}/${itemId}/edit`, item)

                    if (response.status === 200) {
                        navigate(`/${usersId}/home`)
                    }
                }}>
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )   
}

export default EditItem;