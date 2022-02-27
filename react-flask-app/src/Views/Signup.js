import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../CSS_Files/ItemInfo.css";


// TODO: This is used in many places, can extract into its own file
const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
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
    const navigateLogin = (e) => { 
        e.preventDefault()
        navigate(`/login`);
    }

    return(
        <div className='container'>
            <div className='forms-container'>
                <div className='signin-signup'>
                    <Form 
                        action='#'
                    >
                        <h2 className='title'>Sign up</h2>
                        <Form.Field className='input-field'>
                            <i className='fas fa-user'/>
                            <Input
                                type = "text"
                                placeholder = "First Name"
                                value = {firstName}
                                onChange = {e => setFirstName(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field className='input-field'>
                            <i className='fas fa-user'/>
                            <Input
                                type = "text"
                                placeholder = "Last Name"
                                value = {lastName}
                                onChange = {e => setLastName(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field className='input-field'>
                            <i className='fas fa-envelope' />
                            <Input
                                type = "text"
                                placeholder = "Email"
                                value = {email}
                                onChange = {e => setEmail(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field className='input-field'>
                            <i className='fas fa-envelope' />
                            <Input
                                type = "text"
                                placeholder = "Password"
                                value = {password}
                                onChange = {e => setPassword(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Button onClick={navigateLogin}>
                                Cancel
                            </Button>
                            <Button 
                                type = 'submit'
                                className = "btn" 
                                onClick={async () => {
                                const user = {
                                    firstName: firstName,
                                    lastName: lastName,
                                    password: password,
                                    email: email
                                };

                                const response = await api.post('/signup', user)

                                // 200 OK if user is added. If email already exists return 212
                                // NOTE: 212 is a custom status code we should probably log information about it.
                                if (response.status === 200) {
                                    navigate(`/login`);
                                } else if (response.status === 212) {
                                    // Error Validation
                                }
                            }}>
                                Signup
                            </Button>
                        </Form.Field>
                        <div className='social-media'>
                            <a href="/#" className='social-icon'>
                                <i className='fab fa-facebook-f'></i>
                            </a>
                            <a href="/#" className='social-icon'>
                                <i className='fab fa-twitter'></i>
                            </a>
                            <a href="/#" className='social-icon'>
                                <i className='fab fa-google'></i>
                            </a>
                            <a href="/#" className='social-icon'>
                                <i className='fab fa-linkedin-in'></i>
                            </a>
                        </div>
                    </Form>
                </div>
            </div>
            <div className='panel right-panel'>
                    <div className='content'>
                        <h3>One of us?</h3>
                        <p>
                        As a frequent online shopping user, I want to organize and save all desired products in one location, so I can keep track of which purchases I have to make or have made. As a company owner, I want a way to make multiple shopping lists in one application, so that I can order each of my employees required equipment. As a mother, I want a way to save gift ideas for my children for later date in a single location, so that I can revisit the items later. As a student, I want a way to order supplies needed for school at the most affordable rate from different sites, so I can get save the most money ordering my supplies. As a teacher, I want a way to save assignment or project ideas for my students that I could come back to later, so I can easily locate the items to order for those projects later.
                        </p>
                        <button 
                            className='btn transparent' 
                            id='sign-in-btn'
                        >
                            Sign In
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default Signup;