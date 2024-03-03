import React, { useState } from "react";
import "./Forum.css"; // Import the CSS file
import { Button } from "react-bootstrap";
import axios from "axios";
import config from "../config"; // Import the 'config' module

const Forum = ({ currentUser }) => {
    const buttons = [
        { id: "button1", text: "Forum Post 1" },
        { id: "button2", text: "Forum Post 2" }
        // Add more buttons as needed
    ];

    const [activeButton, setActiveButton] = useState(null);
    const [textBoxValues, setTextBoxValues] = useState({});
    const [currentInput, setCurrentInput] = useState("");

    const handleButtonClick = (buttonId) => {
        if (activeButton === buttonId) {
            setActiveButton(null);
        } else {
            setActiveButton(buttonId);
        }
    };

    const handleTextBoxChange = (event) => {
        setCurrentInput(event.target.value);
    };

    const handleEnterKeyPress = (event) => {
        if (event.key === "Enter" && activeButton) {
            event.preventDefault(); // Prevent the default behavior of the Enter key

            setTextBoxValues((prevValues) => ({
                ...prevValues,
                [activeButton]: {
                    messages: [
                        ...(prevValues[activeButton]?.messages || []),
                        currentInput
                    ]
                }
            }));

            // Clear the text box by resetting the current input state
            setCurrentInput("");
        }
    };

    return (
        <div>
            <h1>Welcome to the Tutoring Forum, {currentUser.name}!</h1>
            {buttons.map((button) => (
                <div key={button.id}>
                    <ButtonWithTextBox
                        buttonId={button.id}
                        buttonText={button.text}
                        isActive={activeButton === button.id}
                        onClick={handleButtonClick}
                    />
                    {activeButton === button.id && (
                        <TextBox
                            messages={
                                textBoxValues[activeButton]?.messages || []
                            }
                            onChange={handleTextBoxChange}
                            onKeyPress={handleEnterKeyPress}
                            value={currentInput}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

const ButtonWithTextBox = ({ buttonId, buttonText, isActive, onClick }) => {
    return (
        <div>
            <button onClick={() => onClick(buttonId)}>
                {isActive ? "Hide " : "Show "} {buttonText}
            </button>
        </div>
    );
};

const TextBox = ({ messages, onChange, onKeyPress, value }) => {
    return (
        <div className="textbox-container">
            <div className="message-list">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        {message}
                    </div>
                ))}
            </div>
            <textarea
                rows="2"
                cols="50"
                placeholder="Type something and enter..."
                onChange={onChange}
                onKeyPress={onKeyPress}
                value={value}
            />
        </div>
    );
};

export default Forum;
