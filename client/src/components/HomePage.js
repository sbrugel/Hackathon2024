import "../App.css";
import axios from "axios";
import config from "../config";
import "./HomePage.css";
import { Table, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const handleButtonClick = (rowIndex) => {
    // Handle button click for the specific row (index) here
    console.log(`Button clicked for Row ${rowIndex + 1}`);
};

function HomePage({ currentUser }) {
    const [problemSets, setProblemSets] = useState([]);
    const [users, setUsers] = useState([]);
    // ...
    useEffect(() => {
        axios
            .get("http://localhost:" + config.PORT + "/problemsets")
            .then((res) => {
                setProblemSets(res.data);
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:" + config.PORT + "/users").then((res) => {
            setUsers(res.data);
        });
    }, [problemSets]);

    if (!users && !problemSets) {
        return <p>Loading...</p>;
    } else {
        return (
            <div classname="homepage">
                <h1>Welcome back, {currentUser.name}!</h1>
                <div classname="search-bar">
                    <input placeholder="Problem search..."></input>
                </div>
                <div classname="new-problem">
                    <Button>Create New Problem Set</Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Creator</th>
                            <th>Difficulty</th>
                            <th></th>
                            <th>Leaderboards</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problemSets.map((set) => {
                            return (
                                <tr>
                                    <td>{set.name}</td>
                                    <td>
                                        {users.find(
                                            (user) => user.id === set.authorID
                                        )?.name ?? "A user"}
                                    </td>
                                    <td>{set.category}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleButtonClick(0)}
                                        >
                                            Play
                                        </Button>
                                    </td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleButtonClick(0)}
                                    >
                                        Leaderboard
                                    </Button>
                                    <td></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default HomePage;
