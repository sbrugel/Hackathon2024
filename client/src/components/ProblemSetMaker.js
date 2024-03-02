import SubmitProblem from './SubmitProblem';
import { Form } from "react-bootstrap";
import { useState } from 'react';

export function ProblemSetMaker() {
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
        setQuestions([...questions, {problem, answer}]);
    }

    return (
        <div>
            <h2>Create a Problem Set</h2>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={handleNameChange} />
            </Form.Group>
            <Form.Group controlId="difficulty">
                <Form.Label>Difficulty</Form.Label>
                <Form.Control as="select" value={difficulty} onChange={handleDifficultyChange}>
                    <option value="">Select Difficulty</option>
                    <option value="1st grade">1st Grade</option>
                    <option value="2nd grade">2nd Grade</option>
                    <option value="3rd grade">3rd Grade</option>
                    <option value="4th grade">4th Grade</option>
                    <option value="5th grade">5th Grade</option>
                    <option value="6th grade">6th Grade</option>
                    <option value="7th grade">7th Grade</option>
                    <option value="8th grade">8th Grade</option>
                    <option value="9th grade">9th Grade</option>
                    <option value="10th grade">10th Grade</option>
                    <option value="11th grade">11th Grade</option>
                    <option value="12th grade">12th Grade</option>
                </Form.Control>
            </Form.Group>
            <h3>Questions</h3>
            <table>
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
            </table>
            <SubmitProblem addQuestion={handleAddQuestion} />
        </div>
    )
}