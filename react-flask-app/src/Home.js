import React, { useState, useEffect } from "react";
import ItemList from './ItemList';

const Home = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("/home").then(response => {
        if(response.status == 200) {
            return response.json()
        }
        }).then(data => setItems(data))
    }, [])


    return(
        <ItemList items = {items}/>
    );
};

export default Home;
