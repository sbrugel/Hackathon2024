import React, { useState } from "react";
import axios from "axios";
import config from "../config.json";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "../App.css";
import "./Register.css";

const logo = require("../assets/LOGO.png");

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
            <div className="reg_container">
                <img
                    src={logo}
                    alt="logo"
                    className="logo"
                    style={{ width: "100%" }}
                />
                <h1 className="register_header">Create a new account!</h1>
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
                            style={{
                                marginTop: "40px",
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
                            id="create-account-password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Password"
                            style={{
                                marginTop: "10px",
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
                            onClick={register}
                        >
                            Register
                        </Button>
                    </Form.Group>
                </Form>
                <p>
                    Already have one? <a href="/">Login here!</a>
                </p>
            </div>
        </>
    );
};

export default Register;
