import React, { useState } from 'react';
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
    const [password, setPassword] = useState("");
    const [dob, setDOB] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [cellPhone, setCellPhone] = useState("");
    const [homePhone, setHomePhone] = useState("");

    const navigate = useNavigate();

    // Need to prevent default to prevent warning message that form is disconnected
    const navigateLogin = (e) => { 
        e.preventDefault()
        navigate(`/login`);
    }

    return(
        <Form>
            <Form.Field>
                <Input
                    className='input'
                    type = "text"
                    placeholder = "First Name"
                    value = {firstName}
                    onChange = {e => setFirstName(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    className='input'
                    type = "text"
                    placeholder = "Last Name"
                    value = {lastName}
                    onChange = {e => setLastName(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    className='input'
                    type = "text"
                    placeholder = "Password"
                    value = {password}
                    onChange = {e => setPassword(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    className='input'
                    type = "text"
                    placeholder = "Date of Birth"
                    value = {dob}
                    onChange = {e => setDOB(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    className='input'
                    type = "text"
                    placeholder = "Email"
                    value = {email}
                    onChange = {e => setEmail(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    className='input'
                    type = "text"
                    placeholder = "City"
                    value = {city}
                    onChange = {e => setCity(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    className='input'
                    type = "text"
                    placeholder = "State"
                    value = {state}
                    onChange = {e => setState(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    className='input'
                    type = "text"
                    placeholder = "Zipcode"
                    value = {zipCode}
                    onChange = {e => setZipCode(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    className='input'
                    type = "text"
                    placeholder = "Cell Phone"
                    value = {cellPhone}
                    onChange = {e => setCellPhone(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    className='input'
                    type = "text"
                    placeholder = "Home Phone"
                    value = {homePhone}
                    onChange = {e => setHomePhone(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Button onClick={navigateLogin}>
                    Cancel
                </Button>
                <Button className = "submitButton" onClick={async () => {
                    const user = {
                        firstName: firstName,
                        lastName: lastName,
                        password: password,
                        dob: dob,
                        email: email,
                        city: city,
                        state: state,
                        zipCode: zipCode,
                        cellPhone: cellPhone,
                        homePhone: homePhone
                    };

                    const response = await api.post('/signup', user)

                    if (response.status === 200) {
                        navigate(`/login`);
                    }
                }}>
                    Signup
                </Button>
            </Form.Field>
        </Form>
    )
}

export default Signup;