import React from 'react';
import { List } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// TODO: This is used in many places, can extract into its own file
const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const ItemList = ({items}) => {
    // Use navigation for different forms
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

    const navigateHome = () =>{ 
        navigate("/home");
    }

    const deleteItemClicked = async (itemId) => {
        const response = await api.delete(`/del/${itemId}`)
        
        /******************************************************************************** 
         *   In order to not force a refresh of the page which is inefficient, we can   *
         *  change to a dumbie route and then route back to the correct route instantly *    
         ********************************************************************************/ 
        if (response.status === 200) {
            navigate("/delete");
            navigateHome();
        }
        

    }


    // TODO: Move style to a css file which this file can access
    const itemstyle={
            border: '2px solid black',
            marginBottom:'20px',
            boxShadow:'2px 2px 4px 6px white',
            width: '80%',
            marginLeft: '10%',
            backgroundColor:'rgb(220,220,220'
    }

    // TODO: Move style to a css file which this file can access
    const linkstyle= { 
            textDecoration:'none'
    }

    return(    
        <List>
            {items.map(item => {
                return (
                    <List.Item key = {item.name}>
                        <div className ='item'style={itemstyle}>
                            <div>
                                <p>{item.itemId.toString()}</p>
                                <h3><a className='link' style={linkstyle} href={`//${item.url}`} target="_blank" rel="noreferrer">{item.name}</a></h3>
                                <p>${item.price}</p>
                            </div>
                            <p>{item.description}</p>
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