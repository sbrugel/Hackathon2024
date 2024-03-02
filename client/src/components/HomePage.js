import "../App.css";
import axios from "axios";
import config from "../config";
import "./HomePage.css";
import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";

const handleButtonClick = (rowIndex) => {
    // Handle button click for the specific row (index) here
    console.log(`Button clicked for Row ${rowIndex + 1}`);
};

function HomePage() {
    return (
        <div classname="homepage">
            <p>Welcome back, USERNAME!</p>
            <text>Problem Set</text>
            <div classname="search-bar">
                <input placeholder="Problem search..."></input>
            </div>
            <div classname="new-problem">
                <Button>Create New Problem</Button>
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
                    <tr>
                        <td>Problem 1</td>
                        <td>Leo 1</td>
                        <td>6th grade</td>
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
                    <tr>
                        <td>Problem 2</td>
                        <td>Leo 2</td>
                        <td>6th grade</td>
                        <td>
                            <Button
                                variant="primary"
                                onClick={() => handleButtonClick(0)}
                            >
                                Play
                            </Button>
                        </td>
                        <td>
                            <Button
                                variant="primary"
                                onClick={() => handleButtonClick(0)}
                            >
                                Leaderboard
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default HomePage;
