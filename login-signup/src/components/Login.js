import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Import your custom CSS file for styling

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/", {
                email,
                password
            });

            if (response.data === "exist") {
                navigate("/home", { state: { id: email } });
            } else if (response.data === "notexist") {
                alert("User has not signed up");
            }
        } catch (error) {
            alert("Wrong details");
            console.log(error);
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="animated">Login</h1>
                <form onSubmit={submit}>
                    <div className="form-group">
                        <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                    </div>
                    <button type="submit" className="submit-button">Log In</button>
                </form>
                <p className="animated">OR</p>
                <Link to="/signup" className="signup-link">Sign up</Link>
            </div>
        </div>
    );
}

export default Login;
