import React, { useState, useEffect } from 'react';
import { Form, Input, Button, List } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
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
    const [userId, setUserId] = useState("");
    const [image,setImage]= useState("");
    const [imageList, setImageList] = useState([]);


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

                    // TODO: Remove console log
                    
                    let items= response.data.map;
                    console.log(response.data)


                    return(
                        <List>{response.data.map(item => {
                            return(
                            
                            <List.Item key={item.title}>
                                <div>{item.url}</div>
                            </List.Item>)
                        
                        })



                            }</List>)


                    // let imagediv= document.getElementById('images')
                    // //console.log(response.data[0]['url'])

                    

                    // let imageClass= document.getElementsByClassName('image')
                    
                    // const imageclick = () => {console.log(this.id);}
                    // let innerHtmlstr= ""
                    // for(let i=0; i< response.data.length; i++){
                    //     <Form.Field>
                    //         <img id='image${i}' onClick='imageclick' class='image' src={response.data[i]['url']} height='200px' ></img>
                    //     </Form.Field>
                    //     //innerHtmlstr += `<img id='image${i}' onClick=imageclick class='image' src=${response.data[i]['url']} height='200px' ></img>`
                    // }
                    
                    
                    
                    //imagediv.innerHTML = innerHtmlstr;
                    
                    
                    





                    

                }}>
                    Search Images
                </Button>
            </Form.Field>
            <Form.Field>
                <div id='images'>

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
                        imageUrl: image,
                        url: url.toString().replace(/(^\w+:|^)\/\//, '')
                    };

                    const response = await api.post('/add', item)

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