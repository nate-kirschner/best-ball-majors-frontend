import { useState, useEffect, useMemo } from "react";
import AuthMethods from "./AuthMethods";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import config from "../../config";

export default function ResetPassword() {

    const Auth = new AuthMethods();

    const navigate = useNavigate();

    let query = useQuery();

    const [token, setToken] = useState();
    const [id, setId] = useState();

    useEffect(() => {
        if (Auth.loggedIn()) {
            navigate("/", { replace: true });
        } else {
            setToken(query.get("token"));
            setId(query.get("id"));
        }
    }, [query])

    const [password, setNewPassword] = useState();
    const [passwordConfirm, setNewPasswordConfirm] = useState();

    const submit = () => {
       if (password && passwordConfirm && password !== "" && password === passwordConfirm) {
           const body = {
               userId: id,
               token,
               newPassword: password
           }
           axios.post(config.url + "/reset-password", body).then(resp => {
            if (resp.data.status === 200) {
                alert("Password reset successfully!")
                navigate("/login", { replace: true });
            } else {
                alert("Error updating your new password.")
            }
           })
       }
    }

    return (
        <div className="resetPassword mainPage">

            <h2 className="signupTitle">Reset Password</h2>
            
            <div className="signupBlock">
                <span className="signupLabel">New Password: </span>
                <input type="text" 
                    className="signupInput"
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <div className="signupBlock">
                <span className="signupLabel">New Password: </span>
                <input type="text" 
                    className="signupInput"
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                />
            </div>

            <button className="signupButton" onClick={(e) => submit(e)}>
                Send Email
            </button>
        </div>
    )
}

function useQuery() {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
}