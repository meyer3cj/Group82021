import React, { useState } from 'react';
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
    const [searchTerm, setSearchTerm]= useState('')
    /*********************************************************************************************
     * Prevent default is called in order to prevent function from automatically getting called. *
     *    By doing this it will only get called when the user clicks edit and will pass the      *
     *                                  necessary information                                    *
    **********************************************************************************************/
    const editItemClicked = (itemId) => {
        navigate(`/edit/${itemId}`);
    }

    const removeItemClicked = async (itemId) => {
        const response = await api.post(`/remove/${itemId}`)

        if (response.status === 200) {
            // Force a refresh of the page.
            window.location.reload();
        }
    }
    const BoughtItemClicked = async (itemId) => {
        console.log(itemId)
        const response = await api.post(`/setBought/${itemId}`)
        if(response.status === 200){
            window.location.reload();
        }
    }
    return(   
        <div>
        
        <List className= 'itemList'>
            {items.map(item => {
                return (
                    <List.Item key = {item.itemId}>
                        <div>
                            <div>
                               <p>{item.itemId.toString()}</p>
                                <h3><a className='link' href={`//${item.url}`} target="_blank" rel="noreferrer">{item.name}</a></h3>
                                <p>${item.price}</p>
                            </div>
                            <p>{item.description}</p>
                            <img src={item.image}></img> <br/>
                            <button onClick={e => {e.preventDefault(); editItemClicked(item.itemId)}}>Edit</button>
                            <button onClick={e => {e.preventDefault(); removeItemClicked(item.itemId)}}>Remove from list</button>
                            <button onClick={e => {e.preventDefault(); BoughtItemClicked(item.itemId)}}>set as purchased</button>
                        </div>
                    </List.Item> 
                )
            })}
            <button onClick = {addItemClicked}>add</button>
        </List></div>
    )
}

export default ItemList;