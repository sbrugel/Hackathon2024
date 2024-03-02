import "./App.css";
import Register from "./Register";
import Login from "./Login";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
function App() {
    const [user, setLoginUser] = useState({});

    return (
        <div className="App">
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            user && user._id ? (
                                <Register />
                            ) : (
                                <Login setLoginUser={setLoginUser} />
                            )
                        }
                    />

                    <Route exact path="/register" element={<Register />} />
                    <Route
                        exact
                        path="/login"
                        element={<Login setLoginUser={setLoginUser} />}
                    />
                </Routes>
            </div>
        </div>
    );
}


export default App;
