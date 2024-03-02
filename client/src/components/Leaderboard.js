import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config"; // Import the 'config' module
import "./Leaderboard.css";
import { useParams } from "react-router-dom"; // Import the 'useParams' hook from 'react-router-dom'
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [leaderboard, setLeaderboard] = useState(null);
    const [entries, setEntries] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:${config.PORT}/leaderboard/${id}`)
            .then((res) => {
                setLeaderboard(res.data);
            });
    }, [id]);

    useEffect(() => {
        if (!leaderboard) return;
        console.log(leaderboard);
        axios
            .get(`http://localhost:${config.PORT}/leaderboardentries/`)
            .then((res) => {
                setEntries(
                    res.data
                        .filter((item) =>
                            leaderboard.entryIDs.includes(item.id)
                        )
                        .sort((a, b) => {
                            return a.time - b.time
                        })
                );
            });
    }, [leaderboard]);

    useEffect(() => {
        axios.get(`http://localhost:${config.PORT}/users`).then((res) => {
            setUsers(res.data);
        });
    }, [entries]);

    if (!leaderboard && !entries && !users) {
        return <p>Loading...</p>;
    } else {
        return (
            <div>
                <h2>Leaderboard</h2>
                <Table striped bordered hover className="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.length === 0 ? (
                            <tr>No one's on the leaderboard yet!</tr>
                        ) : (
                            entries.map((entry, index) => {
                                return (
                                    <tr key={entry.userId}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div>
                                                <img
                                                    src={
                                                        users.find(
                                                            (user) =>
                                                                user.id ===
                                                                entry.userId
                                                        )?.avatarURL
                                                    }
                                                    alt="Profile"
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        borderRadius: "50%"
                                                    }}
                                                />
                                            {
                                                users.find(
                                                    (user) =>
                                                        user.id === entry.userId
                                                )?.name
                                            }
                                            </div>
                                        </td>
                                        <td>{entry.time}</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </Table>
                <Button onClick={() => navigate("/")}>Back</Button>
            </div>
        );
    }
};

export default Leaderboard;
