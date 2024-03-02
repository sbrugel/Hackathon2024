import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config"; // Import the 'config' module

const Leaderboard = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:${config.PORT}/leaderboard`) // Use 'config.PORT' to access the 'PORT' property
            .then((res) => {
                setEntries(res.slice().sort((a, b) => a.time - b.time));
            });
    }, []);

    return (
        <div>
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry, index) => (
                        <tr key={entry.userId}>
                            <td>{index + 1}</td>
                            <td>
                                <div>
                                    <img
                                        src={entry.avatarURL}
                                        alt="Profile"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%"
                                        }}
                                    />
                                </div>
                            </td>
                            <td>{entry.userId}</td>
                            <td>{entry.score}</td>
                            <td>{entry.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
