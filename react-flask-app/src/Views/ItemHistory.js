import React, { useState, useEffect } from "react";
import ItemList from './ItemList';
import BoughtList from './boughtList'
import ItemHistoryList from "./ItemHistoryList";
import axios from "axios";

const Home = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("/history").then(response => {
        if(response.status === 200) {
            return response.json()
        }
        }).then(data => setItems(data))
    }, [])

    const handleChange= async (e)=>{
        if (e.target.value ==''){
            fetch("/history").then(response => {
                if(response.status === 200) {
                    return response.json()
                }
                }).then(data => setItems(data))
        }
        else{
        console.log(e.target.value)
        let term= e.target.value
        let response =await axios.get(`/searchHistoryList/${term}`)
        console.log(response.data)
        setItems(response.data)
            }


    }

    return(
        <div>
        <a href='/'>home</a><br/>
        <a href="/bought">Bought items</a><br/>
        <a href="/history">Item history</a><br/>
        <input placeholder='Search' onChange={handleChange}></input> 
        <ItemHistoryList items = {items}/>
        </div>
    );
};

export default Home;