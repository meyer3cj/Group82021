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
    
    const logoutClicked = () => {
        localStorage.clear();
        navigate("/login");
    }

    const profileClicked = () => {
        navigate(`/${usersId}/profile`);
    }

    return(
        <div>
             <div  className= 'navbarstyle'style={{textAlign: 'right', margin: '10px'}}>
               <a className="Title" href="/#" onClick={navigateHome}>Kartz</a>
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
                >Home
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
                className="inputSearch"
                type="text"
                placeholder="Search"
                onChange={handleChange} 
            />
            <BoughtList items = {items}/>
        </div>
    );
};

export default Bought;