import React, { useState } from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from 'reactstrap';

const initialForm = {
    email: '',
    password: '',
    terms: false,
};

function Login() {


    const [form, setForm] = useState(initialForm)

    // HANDLE CHANGE ~~
    const handleChange = (event) => {
        let { name, value, type } = event.target;
        value = type === 'checkbox' ? event.target.checked : value;
        setForm({ ...form, [name]: value });
        // console.log(`${name} : ${value}`)

    }
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Form onSubmit={handleSubmit} >
            <FormGroup >
                <Label for="exampleEmail" >Email</Label>
                <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    onChange={handleChange}
                    value={form.email}
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Enter your password "
                    type="password"
                    onChange={handleChange}
                    value={form.password}
                />
            </FormGroup>
            <FormGroup check>
                <Input
                    id="terms"
                    name="terms"
                    checked={form.terms}
                    type="checkbox"
                    onChange={handleChange}
                />{' '}
                <Label htmlFor="terms" check>
                    I agree to terms of service and privacy policy
                </Label>
            </FormGroup>
            <FormGroup >
                <Button color="primary">
                    Sign In
                </Button>
            </FormGroup>
        </Form>
    );
}

export default Login
