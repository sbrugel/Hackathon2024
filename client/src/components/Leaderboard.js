import React from "react"

const Leaderboard = ({ entries }) => {
    const sortedEntries =   entries.slice().sort((a, b) => a.time - b.time);
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
                    {sortedEntries.map((entry, index) => (
                        <tr key={entry.userId}>
                            <td>{index + 1}</td>
                            <td>
                                <div>
                                    <img src={entry.avatarURL} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
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
}

export default Leaderboard;