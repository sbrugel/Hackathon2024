import { Form, Button } from "react-bootstrap";
import { useState } from "react";

export function SubmitProblem() {
    const [problem, setProblem] = useState("");
    const [answer, setAnswer] = useState(0);

    function handleProblemChange(event) {
        setProblem(event.target.value);
    }

    function handleAnswerChange(event) {
        setAnswer(event.target.value);
    }

    function submitProblem() {
        console.log(problem);
        console.log(answer);
    }

    return (
        <>
            <Form.Label>Problem</Form.Label>
            <br />
            <Form.Control as="textarea" rows={5} value={problem} onChange={handleProblemChange} />
            <br />
            <Form.Label>Answer</Form.Label>
            <br />
            <Form.Control type="number" value={answer} onChange={handleAnswerChange} />
            <br />
            <Button onClick={submitProblem}>
                Submit
            </Button>
        </>
    );
}
