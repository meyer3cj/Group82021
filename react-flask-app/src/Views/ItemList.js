import React from 'react';
import { List } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../CSS_Files/ListStyle.css";

// TODO: This is used in many places, can extract into its own file
const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const ItemList = ({items}) => {
    // Use navigation for different forms
    console.log({items})
    const navigate = useNavigate();

    // When buttons are clicked Navigate to proper routes
    const addItemClicked = () => { 
        navigate("/add");
    }

    /*********************************************************************************************
     * Prevent default is called in order to prevent function from automatically getting called. *
     *    By doing this it will only get called when the user clicks edit and will pass the      *
     *                                  necessary information                                    *
    **********************************************************************************************/
    const editItemClicked = (itemId) => {
        navigate(`/edit/${itemId}`);
    }

    const deleteItemClicked = async (itemId) => {
        const response = await api.delete(`/del/${itemId}`)

        if (response.status === 200) {
            // Force a refresh of the page.
            window.location.reload();
        }
    }

    return(    
        <List>
            {items.map(item => {
                return (
                    <List.Item key = {item.name}>
                        <div className = 'item'>
                            <div>
                                <p>{item.itemId.toString()}</p>
                                <h3><a className='link' href={`//${item.url}`} target="_blank" rel="noreferrer">{item.name}</a></h3>
                                <p>${item.price}</p>
                            </div>
                            <p>{item.description}</p>
                            <img src={item.image}></img> <br/>
                            <button onClick={e => {e.preventDefault(); editItemClicked(item.itemId)}}>Edit</button>
                            <button onClick={e => {e.preventDefault(); deleteItemClicked(item.itemId)}}>Delete</button>
                        </div>
                    </List.Item>
                )
            })}
            <button onClick = {addItemClicked}>add</button>
        </List>
    )
}

export default ItemList;