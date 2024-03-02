import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./App.css";

const Register = ({ setLoginUser }) => {
    const navigate = useNavigate();

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

    const login = (e) => {
        const { name, password } = user;
        if (name && password) {
            axios.post("http://localhost:5000/login", user).then((res) => {
                alert(res.data.message);
                setLoginUser(res.data.user);
                // TODO: navigate("/");
            });
        } else {
            alert("Missing a field!");
        }
    };

    return (
        <>
            <h1>Login...</h1>
            <p>
                Don't have an account? <a href="/register">Register here!</a>
            </p>
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        id="sign-in-name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Username"
                        autocomplete="off"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        id="sign-in-password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                </Form.Group>
                <Form.Group>
                    <Button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            login();
                        }}
                    >
                        Login
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
};

export default Register;
