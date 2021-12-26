import React from 'react';
import {List, Header } from "semantic-ui-react";

export async function editTestClicked (id,name,price,description,url) {

    // TODO: Fix api request
    //await api.post(`/edit/${this.state.id}`, { itemName: '', price: '', description: '', url: '', id:''})
}

export const NameFile2 = ({items}) => {
    return(    
        <List>
            {items.map(item => {
                return (
                    <List.Item key = {item.name}>
                        <div>
                            <p>{item.id.toString()}</p>
                            <h3><a class='link' href={item.url}target="_blank">{item.name}</a></h3>
                            <p>${item.price}</p>
                        </div>
                        <p>{item.description}</p>
                        <button onClick={e=> {e.preventDefault(); editTestClicked(item.id,item.name,item.price,item.description,item.url)}}>edit</button>
                    </List.Item>
                )
            })}
        </List>
    )
}

export default NameFile2;