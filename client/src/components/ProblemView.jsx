import React, { useState, useEffect } from "react";
import "./ProblemView.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import config from "../config"; // Import the 'config' module
import axios from "axios"; // Import the 'axios' module

function ProblemView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [problemSet, setProblemSet] = useState(null);
    const [allProblems, setAllProblems] = useState([]);
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        if (!id) return;
        axios.get(`http://localhost:${config.PORT}/problems`).then((res) => {
            setAllProblems(res.data);
        });
    }, [id]);

    useEffect(() => {
        if (allProblems.length === 0) return;
        axios
            .get(`http://localhost:${config.PORT}/problemsets/${id}`) // Access the 'PORT' property from 'config'
            .then((res) => {
                setProblemSet(res.data);
            });
    }, [allProblems]);

    useEffect(() => {
        if (!problemSet) return;
        setProblems(
            problemSet.problemIDs.map((problemId) => {
                return allProblems.find((problem) => problem.id === problemId);
            })
        );
    }, [problemSet]);

    useEffect(() => {
        if (problems.length === 0) return;
        const intervalId = startStopwatch();
        return () => {
            stopStopwatch(intervalId);
        };
    }, [problems]);

    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [elapsedTime, setElapsedTime] = useState(0);

    const handleAnswerSubmit = (event) => {
        event.preventDefault();
        if (currentProblemIndex >= problems.length - 1) {
            alert("Done");
        } else {
            setCurrentProblemIndex(currentProblemIndex + 1);
            setUserAnswer("");
        }
    };

    const startStopwatch = () => {
        setElapsedTime(0);
        const intervalId = setInterval(() => {
            setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
        }, 1000);
        return intervalId;
    };

    const stopStopwatch = (intervalId) => {
        clearInterval(intervalId);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    if (!(problems && allProblems && problemSet)) return <p>Loading...</p>;
    else {
        return (
            <div>
                <h1>
                    {problems[currentProblemIndex]
                        ? problems[currentProblemIndex].body
                        : "..."}
                </h1>
                <form onSubmit={handleAnswerSubmit}>
                    <input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                    />
                    <p>Press Enter to Submit</p>
                </form>
                <p>Time: {formatTime(elapsedTime)}</p>
            </div>
        );
    }
}

export default ProblemView;
