import React from 'react';
import { List } from "semantic-ui-react";
import axios from 'axios';
import "../CSS_Files/ListStyle.css";

// TODO: This is used in many places, can extract into its own file
const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const ItemHistoryList = ({items}) => {

    /*********************************************************************************************
     * Prevent default is called in order to prevent function from automatically getting called. *
     *    By doing this it will only get called when the user clicks edit and will pass the      *
     *                                  necessary information                                    *
    **********************************************************************************************/

    const deleteItemClicked = async (itemId) => {
        const response = await api.delete(`/${itemId}/deleteItem`)

        if (response.status === 200) {
            // Force a refresh of the page.
            window.location.reload();
        }
    }

    const returnItemClicked = async (itemId) => {
        const response = await api.post(`/${itemId}/returnToList`)
        
        if(response.status === 200){
            window.location.reload();
        }
    }
    
    return(    
        <List className= 'itemList'>
            {items.map(item => {
                return (
                    <List.Item key = {item.itemId}>
                        <div>
                            <h3><a className='link' href={`//${item.url}`} target="_blank" rel="noreferrer">{item.name}</a></h3>
                            <p className="itemInfo">${item.price}</p>
                            <p className="itemInfo">{item.description}</p>
                            <img src={item.image} alt="" />
                            <br/><button className='btn' onClick={e => {e.preventDefault(); deleteItemClicked(item.itemId)}}>Delete</button>
                            <button className='btn' onClick={e => {e.preventDefault(); returnItemClicked(item.itemId)}}>Return item to list</button>
                        </div>
                    </List.Item>
                )
            })}
        </List>
    )
}

export default ItemHistoryList;