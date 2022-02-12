import React, { useState, useEffect } from "react";
import ItemList from './ItemList';
import BoughtList from './boughtList'

const Home = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("/bought").then(response => {
        if(response.status === 200) {
            return response.json()
        }
        }).then(data => setItems(data))
    }, [])


    return(
        <div>
        <a href='/'>home</a>
        <BoughtList items = {items}/>
        </div>
    );
};

export default Home;