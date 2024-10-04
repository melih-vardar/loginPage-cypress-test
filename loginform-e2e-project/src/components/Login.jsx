import React, { useState, useEffect } from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const initialForm = {
    email: '',
    password: '',
    terms: false,
};

const initialErrors = {
    email: false,
    password: false,
    terms: false,
}

export const errorMessages = {
    email: "Enter a valid E-mail",
    password: "Your password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 special character and 1 number."
}

function Login() {


    const [form, setForm] = useState(initialForm)
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState(initialErrors)
    const history = useHistory();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const validatePassword = (password) => {
        return String(password)
            .match(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            );
    };


    // HANDLE CHANGE ~~
    const handleChange = (event) => {
        let { name, value, type } = event.target;
        value = type === 'checkbox' ? event.target.checked : value;
        setForm({ ...form, [name]: value });
        // console.log(`${name} : ${value}`)

        if (name === 'email') {
            if (validateEmail(value)) {
                setErrors({ ...errors, [name]: false });
            } else {
                setErrors({ ...errors, [name]: true });
            }
        }

        if (name === 'password') {
            if (validatePassword(value)) {
                setErrors({ ...errors, [name]: false });
            } else {
                setErrors({ ...errors, [name]: true });
            }
        }

        if (name === 'terms') {
            if (value) {
                setErrors({ ...errors, [name]: false });
            } else {
                setErrors({ ...errors, [name]: true });
            }
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid) return;
        setForm(initialForm);
        history.push('/Success')
    }
    useEffect(() => {
        // console.log(form)
        // console.log("email")
        // console.log(validateEmail(form.email));
        // console.log("password")
        // console.log(validatePassword(form.password));
        // console.log("terms")
        // console.log(form.terms);
        if (
            validateEmail(form.email) &&
            validatePassword(form.password) &&
            form.terms
        ) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [form]);
    return (
        <Form onSubmit={handleSubmit} data-cy="formGeneral">
            <FormGroup data-cy="email">
                <Label for="exampleEmail" >Email</Label>
                <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    onChange={handleChange}
                    value={form.email}
                    invalid={errors.email}
                    data-cy="email-input"
                />
                {errors.email && <FormFeedback data-cy="error-message">{errorMessages.email}</FormFeedback>}
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
                    invalid={errors.password}
                    data-cy="password-input"
                />
                {errors.password && <FormFeedback data-cy="error-message">{errorMessages.password}</FormFeedback>}
            </FormGroup>
            <FormGroup check>
                <Input
                    id="terms"
                    name="terms"
                    checked={form.terms}
                    type="checkbox"
                    onChange={handleChange}
                    invalid={errors.terms}
                    data-cy="checkbox-input"
                />{' '}
                <Label htmlFor="terms" check>
                    I agree to terms of service and privacy policy
                </Label>
            </FormGroup>
            <FormGroup >
                <Button color="primary" disabled={!isValid} data-cy="submit-button">
                    Sign In
                </Button>
            </FormGroup>
        </Form>
    );
}

export default Login
