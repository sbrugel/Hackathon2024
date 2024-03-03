import SubmitProblem from "./SubmitProblem";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import config from "../config";
import "./ProblemSetMaker.css";

export function ProblemSetMaker({ currentUser, editMode }) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [questions, setQuestions] = useState([]);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDifficultyChange(event) {
        setDifficulty(event.target.value);
    }

    function handleAddQuestion(problem, answer) {
        setQuestions([...questions, { problem, answer }]);
    }

    return (
        <div className="problem-set-maker">
            <h2>{editMode ? "Edit" : "Create"} a Problem Set</h2>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <br />
                <Form.Control
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                />
            </Form.Group>
            <br />
            <Form.Group controlId="difficulty">
                <Form.Label>Difficulty</Form.Label>
                <br />
                <Form.Control
                    as="select"
                    value={difficulty}
                    onChange={handleDifficultyChange}
                >
                    <option value="">Select Difficulty</option>
                    <option value="1st Grade">1st Grade</option>
                    <option value="2nd Grade">2nd Grade</option>
                    <option value="3rd Grade">3rd Grade</option>
                    <option value="4th Grade">4th Grade</option>
                    <option value="5th Grade">5th Grade</option>
                    <option value="6th Grade">6th Grade</option>
                    <option value="7th Grade">7th Grade</option>
                    <option value="8th Grade">8th Grade</option>
                    <option value="9th Grade">9th Grade</option>
                    <option value="10th Grade">10th Grade</option>
                    <option value="11th Grade">11th Grade</option>
                    <option value="12th Grade">12th Grade</option>
                </Form.Control>
            </Form.Group>
            
            <div>
                <SubmitProblem addQuestion={handleAddQuestion} />
            </div>
            
            <h3>Questions In Set</h3>
            <Table striped bordered hover>
                <thead>
                    <th>Problem</th>
                    <th>Answer</th>
                </thead>
                <tbody>
                    {questions.map((question, index) => (
                        <tr key={index}>
                            <td>{question.problem}</td>
                            <td>{question.answer}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button style = {{backgroundColor: "green"}}
                onClick={async () => {
                    let id = -1;
                    const set = {
                        name,
                        authorID: currentUser.id,
                        category: difficulty
                    };
                    await axios
                        .post(
                            "http://localhost:" + config.PORT + "/newset",
                            set
                        )
                        .then(async (res) => {
                            id = res.data.id;
                            await Promise.all(
                                questions.map(async (question) => {
                                    await axios
                                        .post(
                                            "http://localhost:" +
                                                config.PORT +
                                                "/newproblem",
                                            {
                                                body: question.problem,
                                                answer: question.answer,
                                                setID: id
                                            }
                                        )
                                        .then((res) => {
                                            console.log(res.data.message);
                                            navigate("/");
                                        });
                                })
                            );
                        });
                }}
            >
                Save Problem Set
            </Button>
        </div>
    );
}
