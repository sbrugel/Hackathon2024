import "../App.css";
import config from "../config";

import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

const logo = require("../assets/LOGO.png");

function HomePage({ currentUser }) {
    const navigate = useNavigate();
    const [problemSets, setProblemSets] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProblemSets = problemSets.filter((set) => {
        return set.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

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
                <div className="welcome-back">
                    <img
                        src={logo}
                        alt="logo"
                        className="logo"
                        style={{ width: "100%" }}
                    />
                    <h3>Welcome back, {currentUser.name}!</h3>
                </div>

                <h2 className="problems-header">Problem Sets</h2>
                <div classname="search-bar">
                    <input
                        placeholder="Problem search..."
                        style={{
                            width: "30%",
                            textAlign: "center",
                            fontSize: "25px",
                            padding: "10px 20px",
                            height: "20px"
                        }}
                        onChange={handleSearchQueryChange}
                    ></input>
                </div>
                <Button
                    className="new_problem"
                    onClick={() => navigate("/psetmaker")}
                >
                    Create New Problem Set
                </Button>
                <Button
                    className="new_problem"
                    onClick={() => navigate("/forum")}
                >
                    Tutoring Forums
                </Button>
                <Table striped bordered hover className="problem-set-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Creator</th>
                            <th>Grade Level</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProblemSets.map((set) => {
                            return (
                                <tr>
                                    <td>{set.name}</td>
                                    <td>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}
                                        >
                                            <img
                                                src={
                                                    users.find(
                                                        (user) =>
                                                            user.id ===
                                                            set.authorID
                                                    )?.avatarURL
                                                }
                                                alt="Profile"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "50%"
                                                }}
                                            />
                                            <span
                                                style={{ marginLeft: "10px" }}
                                            >
                                                {users.find(
                                                    (user) =>
                                                        user.id === set.authorID
                                                )?.name ?? "A user"}
                                            </span>
                                        </div>
                                    </td>
                                    <td>{set.category}</td>
                                    <td>
                                        <Button
                                            className="play-button"
                                            variant="primary"
                                            onClick={() =>
                                                navigate("/game/" + set.id)
                                            }
                                        >
                                            Play
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            className="leaderboard-button"
                                            variant="primary"
                                            onClick={() =>
                                                navigate(
                                                    "/leaderboard/" + set.id
                                                )
                                            }
                                        >
                                            Leaderboard
                                        </Button>
                                    </td>
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
