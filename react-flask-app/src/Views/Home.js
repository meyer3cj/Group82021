import React, { useState, useEffect } from "react";
import ItemList from './ItemList';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [items, setItems] = useState([])

    // Need to get user data for navigation
    const user = JSON.parse(localStorage.getItem("user"));
    const usersId = user[0].userId;

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

    const navigate = useNavigate();

    const handleChange= async (e) => {
        if (e.target.value === ''){
            fetch(`/${usersId}/home`).then(response => {
                if(response.status === 200) {
                    return response.json()
                }
                }).then(data => setItems(data))
        }
        else{
            let term = e.target.value
            let response =await axios.get(`/search/${usersId}/${term}`)
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
        
    const logoutClicked = () => {
        localStorage.clear();
        navigate("/login");
    }

    const profileClicked = () => {
        navigate(`/${usersId}/profile`);
    }

    return(
        <div>
            <div style={{textAlign: 'right', margin: '10px'}}>
                <button
                    className="btn"
                    style={{marginRight: '10px'}}
                    onClick = {profileClicked}
                >
                    Profile
                </button>
                <button
                    className="btnDanger"
                    onClick={logoutClicked}
                >
                    Logout
                </button>
            </div>
            <div>
                <button
                    className="btn"
                    onClick={navigateHome}
                >
                    Home
                </button>
            </div>
            <div>
                <button
                    className="btn"
                    onClick={navigateBought}
                >
                    Bought Items
                </button>
            </div>
            <div>
                <button
                    className="btn"
                    onClick={navigateHistory}
                >
                    Items History
                </button>
            </div>
                <input 
                    className="input"
                    type="text"
                    placeholder="Search" 
                    onChange={handleChange} 
                />
            <ItemList items = {items}/>
        </div>
    );
};

export default Home;
