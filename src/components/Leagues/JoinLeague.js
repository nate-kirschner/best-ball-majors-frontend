import axios from "axios"
import { useEffect, useState, useMemo } from "react"
import config from "../../config"
import AuthMethods from "../authentication/AuthMethods";
import { useNavigate } from "react-router-dom";

export default function JoinLeague() {

    const Auth = useMemo(() => new AuthMethods(), []);

    const [availableLeagues, setAvailableLeagues] = useState([]);
    const [joinLeagueName, setJoinLeagueName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const username = Auth.getConfirm().username;
        axios.post(config.url + "/get-leagues-without-user", { username }).then((resp) => {
            setAvailableLeagues(resp.data);
        })
    }, [])

    const joinLeague = () => {
        const username = Auth.getConfirm().username;
        const chosenLeague = availableLeagues.filter(league => league.league_name === joinLeagueName)
        if (chosenLeague && chosenLeague.length > 0) {
            axios.post(config.url + "/join-league", { leagueName: joinLeagueName, username }).then(resp => {
                if (resp.data.success === 200) {
                    navigate("/leagues", { replace: true });
                } else {
                    setErrorMessage("An error occured when joining this league")
                }
            })
        } else {
            setErrorMessage("Choose an existing league")
        }
        
    }

    const backButtonClicked = () => {
        navigate("/leagues", { replace: true });
    }

    return (
        <div className="joinLeague mainPage">
            <div className="titleDiv">
                <h2 className="signupTitle">Join a League</h2>

                <span className="backButton" onClick={() => backButtonClicked()}>
                    <img className="backArrow" src="https://img.icons8.com/external-kmg-design-basic-outline-kmg-design/16/000000/external-left-arrows-kmg-design-basic-outline-kmg-design-1.png"/>
                    Back to My Leagues
                </span>
            </div>
            
            <p>{errorMessage}</p>
                <div className="signupBlock">
                <label className="signupLabel">League Name</label>
                <input className="signupInput" list="availableLeagues" onChange={(e) => setJoinLeagueName(e.target.value)}/>
                <datalist id="availableLeagues" className="leagueNameInput" >
                    {
                        availableLeagues.map(league => {
                            if (league.league_name.toLowerCase() === joinLeagueName.toLowerCase()) {
                                return <option value={league.league_name}>{league.league_name}</option>
                            }
                        })
                    }
                </datalist>
            </div>
            <button className="submitNewLeagueButton signupButton" onClick={() => joinLeague()}>Join</button>
        </div>
    )
}