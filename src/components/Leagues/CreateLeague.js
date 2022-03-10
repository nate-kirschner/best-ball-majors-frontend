import { useState, useEffect, useMemo } from 'react';
import config from '../../config';
import axios from 'axios';
import AuthMethods from '../authentication/AuthMethods';
import { useNavigate } from "react-router-dom";

export default function CreateLeague() {

    const Auth = useMemo(() => new AuthMethods(), []);

    const navigate = useNavigate();

    const [newLeagueName, setNewLeagueName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState();

    useEffect(() => {
        setUsername(Auth.getConfirm().username);
    }, [Auth])


    const createNewLeague = () => {
        if (newLeagueName.length < 1) {
            setErrorMessage("League name must be longer than one character.");
            return;
        }
        axios.post(config.url + "/create-new-league", { newLeagueName, username }).then((resp) => {
            if (resp.data.success === 200) {
                setErrorMessage("");
                setNewLeagueName("");
                navigate("/leagues", { replace: true });
            } else {
                setErrorMessage("A league with this name already exists");
            }
        })
    }

    const backButtonClicked = () => {
        navigate("/leagues", { replace: true });
    }

    return (
        <div className="createLeague mainPage">
            <div className="titleDiv">
                <h2 className="signupTitle">Create New League</h2>

                <span className="backButton" onClick={() => backButtonClicked()}>
                    <img className="backArrow" src="https://img.icons8.com/external-kmg-design-basic-outline-kmg-design/16/000000/external-left-arrows-kmg-design-basic-outline-kmg-design-1.png"/>
                    Back to My Leagues
                </span>
            </div>
            
            <p>{errorMessage}</p>
            <div className="signupBlock">
                <label className="createLeagueLabel signupLabel">League Name</label>
                <input type="text" className="leagueNameInput signupInput" onChange={(e) => setNewLeagueName(e.target.value)} />
            </div>
            <button className="submitNewLeagueButton signupButton" onClick={() => createNewLeague()}>Submit</button>
        </div>
    )
}