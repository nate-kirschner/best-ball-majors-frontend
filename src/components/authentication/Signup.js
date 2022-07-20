import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import axios from 'axios';
import AuthMethods from "./AuthMethods";

import '../../styles/signup.scss';

export default function Signup({ setLoggedIn }) {

    const navigate = useNavigate();

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const Auth = new AuthMethods();

    useEffect(() => {
        if (Auth.loggedIn()) {
            navigate("/", { replace: true });
        }
    }, [])

    const submit = (e) => {
        e.preventDefault();

        axios.post(config.url + "/signup", {
            username: username,
            email: email,
            password: password
          }).then(resp => {
              if (resp.data.success === 200) {
                axios.post(config.url + "/join-league", { username, leagueName: "BestBallTourn" })
                .then(result => {
                    Auth.login(username, password).then(resp => {
                        console.log(resp);
                        if (!resp || resp.success !== 200) {
                            return alert("Incorrect username or password");
                        }
                        setLoggedIn(true)
                        navigate("/", { replace: true });
                    }).catch(err => {
                        alert(err);
                    })
                })
              } else {
                  alert(resp.data.message);
              }
          }).catch(error => {
            alert("Oops, looks like our servers are down right now :( Please try again later!")
          })
    }

    return (
        <div className="signup mainPage">

            <h2 className="signupTitle">Sign Up</h2>
            
            <div className="signupBlock">
                <span className="signupLabel">Email: </span>
                <input type="text" 
                    className="signupInput"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

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
                Signup
            </button>
        </div>
    )
}