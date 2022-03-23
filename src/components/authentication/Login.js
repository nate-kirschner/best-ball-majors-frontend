import AuthMethods from "./AuthMethods";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useComponentWillMount from "../hooks/componentWillMountHook";
import { Link } from 'react-router-dom';

export default function Login({ setLoggedIn }) {

    const navigate = useNavigate();

    const Auth = new AuthMethods();

    useEffect(() => {
        if (Auth.loggedIn()) {
            navigate("/", { replace: true });
        }
    }, [])

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const submit = (e) => {
        e.preventDefault();

        Auth.login(username, password).then(resp => {
            if (!resp || resp.success !== 200) {
                alert("Incorrect username or password");
            }
            setLoggedIn(true)
            navigate("/", { replace: true });
        }).catch(err => {
            alert(err);
        })
    }

    return (
        <div className="signup mainPage">

            <h2 className="signupTitle">Log In</h2>
            
            <div className="signupBlock">
                <span className="signupLabel">Username: </span>
                <input type="text" 
                    className="signupInput"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="signupBlock">
                <span className="signupLabel">Password: </span>
                <input type="password" 
                    className="signupInput"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button className="signupButton" onClick={(e) => submit(e)}>
                Login
            </button>

            <p className="loginText">Don't have an account? <Link to="/signup">Sign up here!</Link></p>

            <p className="loginText">Forgot your password? <Link to="/forgotPassword">Reset it here!</Link></p>
        </div>
    )
}