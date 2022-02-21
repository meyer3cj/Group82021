import React, { useState, useEffect } from "react";
import ItemList from './ItemList';
import BoughtList from './boughtList'
import axios from "axios";

const Home = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("/bought").then(response => {
        if(response.status === 200) {
            return response.json()
        }
        }).then(data => setItems(data))
    }, [])
    const handleChange= async (e)=>{
        if (e.target.value ==''){
            fetch("/bought").then(response => {
                if(response.status === 200) {
                    return response.json()
                }
                }).then(data => setItems(data))
        }
        else{
        console.log(e.target.value)
        let term= e.target.value
        let response =await axios.get(`/searchBoughtList/${term}`)
        console.log(response.data)
        setItems(response.data)
            }
        }


    return(
        <div>
        <a href='/'>home</a><br/>
        <a href="/bought">Bought items</a><br/>
        <a href="/history">Item history</a><br/>
        <input placeholder='search' onChange={handleChange}></input>
        <BoughtList items = {items}/>
        </div>
    );
};

export default Home;