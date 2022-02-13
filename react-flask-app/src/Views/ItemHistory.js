import React, { useState, useEffect } from "react";
import ItemList from './ItemList';
import BoughtList from './boughtList'
import ItemHistoryList from "./ItemHistoryList";

const Home = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("/history").then(response => {
        if(response.status === 200) {
            return response.json()
        }
        }).then(data => setItems(data))
    }, [])


    return(
        <div>
        <a href='/'>home</a>
        <ItemHistoryList items = {items}/>
        </div>
    );
};

export default Home;