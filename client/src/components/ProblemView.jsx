import React, { useState, useEffect } from "react";
import "./ProblemView.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useWindowSize from "react-use/lib/useWindowSize";
import config from "../config"; // Import the 'config' module
import axios from "axios"; // Import the 'axios' module
import { Button } from "react-bootstrap";
import Confetti from "react-confetti";

function ProblemView({ currentUser }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const { width, height } = useWindowSize();

    const [problemSet, setProblemSet] = useState(null);
    const [allProblems, setAllProblems] = useState([]);
    const [problems, setProblems] = useState([]);

    const [finished, setFinished] = useState(false);
    const [finalTime, setFinalTime] = useState(0);

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
        const answer = userAnswer;
        setUserAnswer("");
        // eslint-disable-next-line eqeqeq
        if (answer == problems[currentProblemIndex].answer) {
            setCurrentProblemIndex(currentProblemIndex + 1);
        }
        if (currentProblemIndex >= problems.length - 1) {
            setFinalTime(elapsedTime);
            setFinished(true);
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
        if (!finished) {
            return (
                <div className="mainproblemview">
                    <h1>
                        {problems[currentProblemIndex]
                            ? problems[currentProblemIndex].body
                            : "..."}
                    </h1>
                    <form onSubmit={handleAnswerSubmit}>
                        <input
                            type="number"
                            value={userAnswer}
                            style={{
                                width: "30%",
                                textAlign: "center",
                                fontSize: "25px",
                                padding: "10px 20px",
                                height: "20px"
                            }}
                            onChange={(e) => setUserAnswer(e.target.value)}
                        />
                        <p>Press Enter to Submit</p>
                    </form>
                    <p>Time: {formatTime(elapsedTime)}</p>
                </div>
            );
        } else {
            return (
                <div className="mainproblemview">
                    <Confetti width={width} height={height} />
                    <h1>Well done!</h1>
                    <p>
                        You completed the problem set in {finalTime} seconds.
                        We'll submit your results to the leaderboard now.
                    </p>
                    <Button
                        className="new_problem"
                        onClick={async () => {
                            await axios
                                .post(
                                    `http://localhost:${config.PORT}/newleaderboardentry`,
                                    {
                                        userId: currentUser.id,
                                        time: finalTime,
                                        leaderboardID: id
                                    }
                                )
                                .then(() => {
                                    navigate(`/leaderboard/${id}`);
                                });
                        }}
                    >
                        OK
                    </Button>
                </div>
            );
        }
    }
}

export default ProblemView;
