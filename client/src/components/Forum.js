import React, { useState, useEffect } from "react";
import "./Forum.css"; // Import the CSS file
import axios from "axios";
import config from "../config"; // Import the 'config' module
import { Modal, Button } from "react-bootstrap";

const Forum = ({ currentUser }) => {
    const buttons = [
        { id: "button1", text: "Forum Post 1" },
        { id: "button2", text: "Forum Post 2" }
        // Add more buttons as needed
    ];

    const [forceReload, setForceReload] = useState(0);
    const [topics, setTopics] = useState(null);
    const [posts, setPosts] = useState(null);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:" + config.PORT + "/users", {
                headers: {
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0"
                }
            })
            .then((res) => {
                setUsers(res.data);
            });
    }, []);

    useEffect(() => {
        if (!users) return;
        axios
            .get("http://localhost:" + config.PORT + "/topics", {
                headers: {
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0"
                }
            })
            .then((res) => {
                setTopics(res.data);
            });
    }, [users]);

    useEffect(() => {
        if (!topics) return;
        axios
            .get("http://localhost:" + config.PORT + "/posts", {
                headers: {
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0"
                }
            })
            .then((res) => {
                setPosts((prevState) => res.data);
            });
    }, [topics, forceReload]);

    useEffect(() => {
        console.log(posts);
    }, [posts]);

    const [currentInput, setCurrentInput] = useState("");
    const [textBoxValues, setTextBoxValues] = useState([]);
    const [activeTopic, setActiveTopic] = useState(null);

    const handleTextBoxChange = (event) => {
        setCurrentInput(event.target.value);
    };

    if (!(users && posts && topics)) return <p>Loading...</p>;
    else {
        return (
            <div>
                <h1>Welcome to the Tutoring Forum, {currentUser.name}!</h1>
                <Button
                    className="new_problem"
                    variant="primary"
                    onClick={() =>
                        axios.post(
                            "http://localhost:" + config.PORT + "/topic",
                            {
                                originalAuthorID: currentUser.id,
                                title: "Need Help on Algebra Set!"
                            }
                        )
                    }
                >
                    New Topic
                </Button>
                {activeTopic ? (
                    <TextBox
                        messages={activeTopic.postIDs || []}
                        posts={posts}
                        users={users}
                        onChange={handleTextBoxChange}
                        forceReload={forceReload}
                        setForceReload={setForceReload}
                        activeTopic={activeTopic}
                        currentUser={currentUser}
                        setCurrentInput={setCurrentInput}
                        value={currentInput}
                    />
                ) : null}
                {topics.map((topic) => (
                    <div key={topic.id}>
                        <h2>{topic.title}</h2>
                        <p>
                            <em>
                                Posted by{" "}
                                <strong>
                                    <u>
                                        {
                                            users.find(
                                                (user) =>
                                                    user.id ===
                                                    topic.originalAuthorID
                                            ).name
                                        }
                                    </u>{" "}
                                </strong>
                                on{" "}
                                {new Date(topic.postTime).toLocaleString(
                                    "en-US",
                                    {
                                        month: "2-digit",
                                        day: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    }
                                )}
                            </em>
                        </p>
                        <Button
                            className="new_problem"
                            style={{
                                backgroundColor:
                                    activeTopic === topic ? "red" : "green",
                                color: activeTopic === topic ? "white" : "black"
                            }}
                            onClick={() => {
                                if (activeTopic === topic) {
                                    setActiveTopic(null);
                                } else {
                                    setActiveTopic(topic);
                                }
                            }}
                        >
                            {activeTopic === topic ? "Close" : "Open"}
                        </Button>
                    </div>
                ))}
            </div>
        );
    }
};

const TextBox = ({
    messages,
    posts,
    users,
    onChange,
    forceReload,
    setForceReload,
    activeTopic,
    currentUser,
    setCurrentInput,
    value
}) => {
    return (
        <div className="textbox-container">
            <div className="message-list">
                {messages.map((message, index) => {
                    const myPost = posts.find((post) => post.id === message);
                    return (
                        <div key={index} className="message">
                            <img
                                src={
                                    users.find(
                                        (user) => user.id === myPost.authorID
                                    )?.avatarURL
                                }
                                alt="Profile"
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    display: "inline-block"
                                }}
                            />
                            <div
                                style={{
                                    display: "inline-block",
                                    marginLeft: "10px"
                                }}
                            >
                                <p style={{ color: "gray" }}>
                                    {
                                        users.find(
                                            (user) =>
                                                user.id === myPost.authorID
                                        ).name
                                    }{" "}
                                    posted on{" "}
                                    {new Date(myPost.postTime).toLocaleString(
                                        "en-US",
                                        {
                                            month: "2-digit",
                                            day: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        }
                                    )}
                                </p>
                                <p>
                                    <em>{myPost.body}</em>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <textarea
                rows="2"
                cols="50"
                placeholder="Type something and enter..."
                onChange={onChange}
                onKeyPress={async (event) => {
                    if (event.key === "Enter") {
                        event.preventDefault(); // Prevent the default behavior of the Enter key
                        setCurrentInput("");

                        await axios
                            .post(
                                "http://localhost:" + config.PORT + "/newpost",
                                {
                                    authorID: currentUser.id, // Replace with the actual author ID
                                    body: event.target.value,
                                    threadID: activeTopic.id
                                }
                            )
                            .then(() => {
                                alert("Posted");
                                setForceReload(forceReload + 1);
                            });
                    }
                }}
                value={value}
            />
        </div>
    );
};

export default Forum;
