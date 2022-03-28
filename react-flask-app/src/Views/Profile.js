import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

const Profile = () => {
    // Hooks for setting and using user inputted information.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Active user login info
    const user = JSON.parse(localStorage.getItem("user"));
    const usersId = user[0].userId;

    // Use Effect to fetch data info
    useEffect(() => {
        fetch(`/${usersId}/accountInfo`).then(response => {
        if(response.status === 200) {
            return response.json()
        }
        }).then(data => {
            setEmail(data[0].email);
            setPassword(data[0].password);
        })
    }, [usersId])
    
    // Navigation
    const navigate = useNavigate();

    // Need to prevent default to prevent warning message that form is disconnected
    const navigateHome = (e) => {
        e.preventDefault();
        navigate(`/${user[0].userId}/home`);
    }

    const deleteAccountClicked = async () => {
    
        // Send delete request to database
        await api.delete(`/${usersId}/deleteAccount`, usersId)

        // Then clear storage to logout user
        localStorage.clear();
        navigate("/login");
    }

    return(
        <Form className = "formView">
            <Button 
                className='btn'
                onClick={navigateHome}>
                    Home
            </Button>
            <Form.Field className = "inputContainer">
                <Input
                    type = "text"
                    value = {email}
                    onChange = {e => setEmail(e.target.value)}
                />
            </Form.Field>
            <Button
                className='btn'
                onClick={async () => {
                    const profile = {
                        email: email
                    };

                    const response = await api.post(`/${usersId}/updateEmail`, profile)

                    if (response.status === 200) {
                        navigate(`/${usersId}/profile`)
                    }
                }}>
                    Update Email
            </Button>
            <Form.Field className = "inputContainer">
                <Input
                    type = "password"
                    onChange = {e => setPassword(e.target.value)}
                />
            </Form.Field>
            <Button 
                className='btn'
                onClick={async () => {
                    const profile = {
                        password: password
                    };

                    const response = await api.post(`/${usersId}/updatePassword`, profile)

                    if (response.status === 200) {
                        navigate(`/${usersId}/profile`)
                    }
                }}>
                    Update Password
            </Button>
            <Button 
                className='btnDanger'
                onClick={deleteAccountClicked}>
                    Delete Account
            </Button>
        </Form>
    );
};

export default Profile;