import React, { useState, useEffect } from "react";
import ItemList from './ItemList';
import axios from "axios";
import LoginStyle from '../CSS_Files/LoginStyle.css'

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
    const handleChange= async (e)=>{
        if (e.target.value ==''){
            fetch("/home").then(response => {
                if(response.status === 200) {
                    return response.json()
                }
                }).then(data => setItems(data))
        }
        else{
        console.log(e.target.value)
        let term= e.target.value
        let response =await axios.get(`/search/${term}`)
        console.log(response.data)
        setItems(response.data)
            }


    }

    return(
        <div>
        <a href='/'>home</a><br/>
        <a href="/bought">Bought items</a><br/>
        <a href="/history">Item history</a><br/>
        <input placeholder="search" onChange={handleChange}></input>
        <ItemList items = {items}/>
        </div>
    );
};

export default Home;
