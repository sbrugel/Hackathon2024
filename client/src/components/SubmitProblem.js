import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import "./SubmitProblem.css";

const SubmitProblem = ({ addQuestion }) => {
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
        addQuestion(problem, answer);
    }

    return (
        <div>
            <h3 style={{ fontWeight: "light" }}>Add Question</h3>
            <Form.Label>Problem</Form.Label>
            <br />
            <Form.Control
                as="textarea"
                rows={5}
                value={problem}
                onChange={handleProblemChange}
                style={{ width: "60%", textAlign: "center", fontSize: "25px", margin: "0 auto", padding: "10px 20px", borderRadius: "10px", height: "50px"}}
            />
            <br />
            <Form.Label>Answer</Form.Label>
            <br />
            <Form.Control
                type="number"
                value={answer}
                onChange={handleAnswerChange}
                style={{ width: "8%", textAlign: "center"}}
            />
            <br />
            <Button style={{
                display: "block",
                margin: "0 auto",
                padding: "10px 20px",
                backgroundColor: "#0ca002",
                color: "#fff",
                textAlign: "center",
                fontSize: "18px",
                borderRadius: "11px",
                transition: "background-color 0.3s ease",
                outline: "none",
                justifyContent: "center",
                width: "25%"
            }} onClick={submitProblem}>Add Question</Button>
        </div>
    );
};

export default SubmitProblem;
