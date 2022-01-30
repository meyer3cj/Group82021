import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../CSS_Files/loginStyle.css";

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
        <div className='container'>
            <div className='forms-container'>
                <div className='signin-signup'>
                    <Form 
                        action='#' 
                        className='sign-in-form'
                    >
                        <h2 className='title'>Sign in</h2>
                        <Form.Field className='input-field'>
                            <i className='fas fa-user' />
                                <Input 
                                    placeholder = "Username"
                                    value = {username}
                                    onChange = {e => setUsername(e.target.value)}
                                />
                        </Form.Field>
                        <Form.Field className='input-field'>
                            <i className='fas fa-user' />
                                <Input 
                                    placeholder = "Password"
                                    value = {password}
                                    onChange = {e => setPassword(e.target.value)}
                                />
                        </Form.Field>
                        <Form.Field>
                            <Button className = 'btn solid' onClick={async (e) => {
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
                            <p className='social-text'>Or Sign in with social platforms</p>
                            <div className='social-media'>
                                <a href="#" className='social-icon'>
                                    <i className='fab fa-facebook-f'></i>
                                </a>
                                <a href="#" className='social-icon'>
                                    <i className='fab fa-twitter'></i>
                                </a>
                                <a href="#" className='social-icon'>
                                    <i className='fab fa-google'></i>
                                </a>
                                <a href="#" className='social-icon'>
                                    <i className='fab fa-linkedin-in'></i>
                                </a>
                            </div>
                        </Form.Field>
                    </Form>
                </div>
            </div>

            <div className='panels-container'>
                <div className='panel left-panel'>
                    <div className='content'>
                        <h3>New Here?</h3>
                        <p>
                            The site is designed to allow a user to gather items from their online shopping carts and can notify them of stock updates and price changes from multiple sites. The application will also save purchase information for ease of access when completing a purchase. The site is aimed towards consumers that frequently shop online on multiple websites in order to organize and monitor online items and services.
                        </p>
                        <button
                            className='btn transparent'
                            id='sign-up-btn'
                            onClick={navigateSignup}
                        >
                                Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Login;