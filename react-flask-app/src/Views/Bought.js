import React, { useState, useEffect } from "react";
import BoughtList from './boughtList'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Bought = () => {
    const [items, setItems] = useState([])

    // Need to get user data for navigation
    const user = JSON.parse(localStorage.getItem("user"));
    const usersId = user[0].userId;

    useEffect(() => {
        fetch(`/${usersId}/bought`).then(response => {
        if(response.status === 200) {
            return response.json()
        }
        }).then(data => setItems(data))
    }, [usersId])

    const navigate = useNavigate();

    const handleChange= async (e)=>{
        if (e.target.value === ''){
            fetch(`/${usersId}/bought`).then(response => {
                if(response.status === 200) {
                    return response.json()
                }
                }).then(data => setItems(data))
        }
        else{
            let term= e.target.value
            let response =await axios.get(`/searchBoughtList/${usersId}/${term}`)
            setItems(response.data)
        }
    }

    // Need to prevent default to prevent warning message that form is disconnected
    const navigateHome = (e) => { 
        e.preventDefault()
        navigate(`/${usersId}/home`);
    }

    const navigateBought = (e) => { 
        e.preventDefault()
        navigate(`/${usersId}/bought`);
    }

    const navigateHistory = (e) => { 
        e.preventDefault()
        navigate(`/${usersId}/history`);
    }


    return(
        <div>
            <div>
                <button
                    onClick={navigateHome}
                >Home
                </button>
            </div>
            <div>
                <button
                    onClick={navigateBought}
                >
                    Bought Items
                </button>
            </div>
            <div>
                <button
                    onClick={navigateHistory}
                >
                    Items History
                </button>
            </div>
            <input placeholder='search' onChange={handleChange}></input>
            <BoughtList items = {items}/>
        </div>
    );
};

export default Bought;