import React from 'react';
import { useNavigate } from 'react-router-dom';
import {List} from "semantic-ui-react";

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
    **********************************************************************************************
    */
    const editItemClicked = (itemId) => {
        navigate(`/edit/${itemId}`);
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
                        <div class='item'style={itemstyle}>
                            <div>
                                <p>{item.itemId.toString()}</p>
                                <h3><a class='link' style={linkstyle} href={`//${item.url}`} target="_blank">{item.name}</a></h3>
                                <p>${item.price}</p>
                            </div>
                            <p>{item.description}</p>
                            <button onClick={e => {e.preventDefault(); editItemClicked(item.itemId)}}>edit</button>
                        </div>
                    </List.Item>
                )
            })}
            <button onClick = {addItemClicked}>add</button>
        </List>
    )
}

export default ItemList;