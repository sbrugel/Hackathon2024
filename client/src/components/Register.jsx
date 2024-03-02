import React, { useState } from "react";
import axios from "axios";
import config from "../config.json";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "../App.css";

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const register = (e) => {
        e.preventDefault();

        const { name, password } = user;
        if (name && password) {
            axios
                .post("http://localhost:" + config.PORT + "/register", user)
                .then((res) => {
                    alert(res.data.message);
                });
        } else {
            alert("Missing a field!");
        }
    };

    return (
        <>
            <h1>Create a new account...</h1>
            <p>
                Already have one? <a href="/login">Login here!</a>
            </p>
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        id="create-account-name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        autocomplete="off"
                        placeholder="Username"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        id="create-account-password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                </Form.Group>
                <Form.Group>
                    <Button type="submit" onClick={register}>
                        Register
                    </Button>
                </Form.Group>
            </Form>
            <Button onClick={register}>OK</Button>
        </>
    );
};

export default Register;
