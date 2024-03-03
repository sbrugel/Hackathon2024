import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config.json";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./Login.css";
import "../App.css";

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
            axios
                .post("http://localhost:" + config.PORT + "/login", user)
                .then((res) => {
                    setLoginUser(res.data.user);
                });
        } else {
            alert("Missing a field!");
        }
    };

    return (
        <>
            <div className = "container">
                <h2 className="login_header">Sign In</h2>
                <p>Keep your personal records!</p>
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
                            style={{
                                marginTop:"10px",
                                width: "50%",
                                textAlign: "left",
                                fontSize: "20px",
                                padding: "10px 20px",
                                height: "20px"
                            }}
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
                            style={{
                                marginTop:"10px",
                                width: "50%",
                                textAlign: "left",
                                fontSize: "20px",
                                padding: "10px 20px",
                                height: "20px"
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button
                            type="submit"
                            className="new_problem"
                            onClick={(e) => {
                                e.preventDefault();
                                login();
                            }}
                        >
                            Login
                        </Button>
                    </Form.Group>
                </Form>
                <p>
                    Don't have an account? <a href="/register">Register here!</a>
                </p>
                </div>
        </>
    );
};

export default Register;
