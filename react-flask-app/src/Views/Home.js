import React, { useState, useEffect } from "react";
import ItemList from './ItemList';

const Home = () => {
    const [items, setItems] = useState([])

    // Get users list
    useEffect(() => {
        // Get user info from local storage prior to inital load.
        const user = JSON.parse(localStorage.getItem("user"));
         
        fetch(`/${user[0].userId}/home`).then(response => {
            if(response.status === 200) {
                
                return response.json()
            }
        }).then(data => setItems(data))
    }, [])


    return(
        <ItemList items = {items}/>
    );
};

export default Home;
