import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// TODO: This is used in many places, can extract into its own file
const api = axios.create({
    baseURL: 'http://localhost:3000/'
})


const Login = () => {
    // Hooks for setting and using user inputted information.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Navigation
    const navigate = useNavigate();

    useEffect(() => {
        // Check if a user is already logged in, if so navigate to their list.
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            navigate(`/${foundUser[0].userId}/home`)
        }
    }, [navigate]);

    // Need to prevent default to prevent warning message that form is disconnected
    const navigateSignup = (e) => { 
        e.preventDefault()
        navigate(`/signup`);
    }

    return(   
        <Form >
            <Form.Field>
                <Input 
                    value = {username}
                    onChange = {e => setUsername(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    value = {password}
                    onChange = {e => setPassword(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Button className = "submitButton" onClick={async (e) => {
                    e.preventDefault();

                    // Wrap inside of try catch
                    const credenitals = {
                        username: username,
                        password: password
                    };
                    
                    try {
                        // Send username and password to the server.
                        const response = await api.post(`/login`, credenitals)

                        // Store the user in localStorage
                        localStorage.setItem('user', JSON.stringify(response.data))

                        // Get stored data to navigate
                        const user = JSON.parse(localStorage.getItem("user"));

                        if (response.status === 200) {
                            navigate(`/home/${user[0].userId}`)
                        }
                    }
                    catch {
                        // TODO: Look into a possible better way to check status
                        // Unauthorized so need to change page.
                    }
                    
                }}>
                    Submit
                </Button>
                <Button onClick={navigateSignup}>
                    Signup
                </Button>
            </Form.Field>
        </Form>
    )   
}

export default Login;