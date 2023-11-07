import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css"; // Import your custom CSS file for styling

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/signup", {
                name,
                email,
                password,
                dob
            });

            if (response.data === "exist") {
                alert("User already exists");
            } else if (response.data === "notexist") {
                navigate("/home", { state: { id: email } });
            }
        } catch (error) {
            alert("Wrong details");
            console.log(error);
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h1 className="animated">Signup</h1>
                <form onSubmit={submit}>
                    <div className="form-group">
                        <input type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <input type="date" onChange={(e) => { setDob(e.target.value) }} placeholder="Dob" />
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
                <p className="animated">OR</p>
                <Link to="/" className="login-link">Login Page</Link>
            </div>
        </div>
    );
}

export default Signup;
