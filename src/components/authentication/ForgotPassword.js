import axios from "axios";
import { useEffect, useState } from "react"
import config from "../../config";
import AuthMethods from "./AuthMethods";

import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

    const navigate = useNavigate();

    const Auth = new AuthMethods();

    useEffect(() => {
        if (Auth.loggedIn()) {
            navigate("/", { replace: true });
        }
    }, [])

    const [email, setEmail] = useState("");

    const submit = () => {
        axios.post(config.url + "/reset-password-request", { email }).then(resp => {
            
        })
        alert("We sent a reset password link to the provided email address.")
        navigate("/login", { replace: true });
    }

    useEffect(() => {

    })

    return (
        <div className="forgotPassword mainPage">

            <h2 className="signupTitle">Reset Password</h2>
            
            <div className="signupBlock">
                <span className="signupLabel">Email: </span>
                <input type="text" 
                    className="signupInput"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <button className="signupButton" onClick={(e) => submit(e)}>
                Send Email
            </button>
        </div>
    )
}