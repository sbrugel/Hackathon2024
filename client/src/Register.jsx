import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import "./App.css";

const Register = () => {
    const register = (e) => {
        e.preventDefault();

        const user = {
            name: "JohnDoe",
            password: "abc"
        };
        const { name, password } = user;
        if (name && password) {
            axios.post("http://localhost:5000/register", user).then((res) => {
                alert(res.data.message);
            });
        } else {
            alert("Error!");
        }
    };
    return (
        <>
            <h1>Register</h1>
            <p>Components go here</p>
            <Button onClick={register}>OK</Button>
        </>
    );
};

export default Register;
