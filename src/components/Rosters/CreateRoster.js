import axios from "axios";
import { useEffect, useState, useMemo, useRef } from "react";
import config from "../../config";
import AuthMethods from "../authentication/AuthMethods";

import "../../styles/createRoster.scss";
import "../../styles/rosterCard.scss"
import { useNavigate } from "react-router-dom";

export default function CreateRoster({ canCreateRoster }) {

    const navigate = useNavigate();

    useEffect(() => {
        if (!canCreateRoster) {
            navigate("/rosters", { replace: true });
        }
    }, [canCreateRoster])

    const [playersData, setPlayersData] = useState();
    const [usersLeagues, setUsersLeagues] = useState([]);

    const [selectedPlayers, setSelectedPlayers] = useState({ 1: null, 2: null, 3: null, 4: null});
    const [rosterName, setRosterName] = useState("Roster 1");
    const [selectedLeagues, setSelectedLeagues] = useState([]);

    const [errorMessage, setErrorMessage] = useState("");

    const leagueDropdownRef = useRef();

    useEffect(() => {
        axios.post(config.url + "/get-players-in-current-tournament").then(resp => {
            setPlayersData(resp.data);
        })
    }, []);

    const Auth = useMemo(() => new AuthMethods(), []);

    useEffect(() => {
        const username = Auth.getConfirm().username;
        axios.post(config.url + "/get-users-leagues", { username }).then(resp => {
            setUsersLeagues(resp.data);
        })
    }, [])


    const handleClickRow = (pageNum, player) => {
        if (selectedPlayers[pageNum]) {
            if (selectedPlayers[pageNum].id === player.id) {
                setSelectedPlayers({ ...selectedPlayers, [pageNum]: null });    
            } else {
                setSelectedPlayers({ ...selectedPlayers, [pageNum]: player})
            }
        } else {
            setSelectedPlayers({ ...selectedPlayers, [pageNum]: player })
        }
    }

    const renderSection = (pageNum) => {
        if (!playersData) {
            return;
        }
        const playerList = playersData[pageNum];

        if (selectedPlayers[pageNum] && playerList.includes(selectedPlayers[pageNum])) {
            return renderPlayerRow(pageNum, selectedPlayers[pageNum])
        }
        if (pageNum === 1 || selectedPlayers[pageNum - 1]) {
            return (
                <>
                    <h4 className="chooseText">Choose a player:</h4>
                    <div className="createRosterTable">
                        {
                            playerList.map(player => {
                                return renderPlayerRow(pageNum, player);
                            })
                        }
                    </div>
                </>
            )
        }
        
    }

    const renderPlayerRow = (pageNum, player) => {
        return (
            <div className="createRosterRow"
                onClick={() => handleClickRow(pageNum, player)}
            >
                <div className="createRosterCell check">
                    <input type="checkbox" checked={selectedPlayers[pageNum] && selectedPlayers[pageNum] === player}/>
                </div>
                <div className="createRosterCell name">
                    <span>{player.player_name}</span>
                </div>
                <div className="createRosterCell rank">
                    <span>{player.player_rank}</span>
                </div>
                
            </div>
        )
    }

    const [leaguesDropdownOpen, setLeaguesDropdownOpen] = useState(false);

    const renderLeaguesDropdown = () => {
        return (
            <>
                <div className="leagueDropdown" ref={leagueDropdownRef} onClick={() => setLeaguesDropdownOpen(!leaguesDropdownOpen)}>
                    Leagues
                    <img className="dropdownArrow" src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/000000/external-arrow-arrows-those-icons-lineal-color-those-icons-1.png"/>
                    {
                        leaguesDropdownOpen && dropdown()
                    }
                    
                </div>
                <div className="selectedLeagues">
                {
                    selectedLeagues.map(league => {
                        return (
                            <div className="selectedLeagueOption"
                                onClick={() => {
                                    setSelectedLeagues(selectedLeagues.filter(l => l.id !== league.id));
                                    setLeaguesDropdownOpen(false);
                                }}
                            >
                                {league.league_name}
                            </div>
                        )
                    })
                }
            </div>
        </>
        )
    }

    const dropdown = () => {
        if (leagueDropdownRef.current) {
            const { offsetTop, offsetLeft, clientHeight, clientWidth } = leagueDropdownRef.current;
            const style = {
                position: 'absolute',
                width: `${clientWidth}px`,
                left: `${offsetLeft}px`,
                top: `${offsetTop + clientHeight + 5}px`,
            }
            return (
                <div className="dropdown" style={style}>
                    {
                        usersLeagues.filter(league => !selectedLeagues.includes(league)).map(league => {
                            return (
                                <div className="leagueOption" onClick={() => {
                                    // setLeaguesDropdownOpen(false);
                                    setSelectedLeagues([...selectedLeagues, league]);
                                }}>
                                    {league.league_name}
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return null;
        }
    }

    const displaySubmitButton = () => {
        return (
            <>
                <p>{errorMessage}</p>
                <div className="submitButton"
                    onClick={() => submitButton()}
                >
                    Create Roster
                </div>
            </>
        )
    }

    const submitButton = () => {
        // to submit
        // frontend      roster name, user id, selected player ids, leagues
        // backend       current tournament
        if (rosterName === "") {
            setErrorMessage("Looks like you forgot to name your roster!")
            return;
        }
        if (selectedLeagues.length === 0) {
            setErrorMessage("Uh oh! You haven't selected a league for this roster. If you have no available leagues you can either join a new one or wait until the next tournament.")
            return;
        }

        const username = Auth.getConfirm().username;

        const body = {
            rosterName,
            username,
            player1Id: selectedPlayers[1].id,
            player2Id: selectedPlayers[2].id,
            player3Id: selectedPlayers[3].id,
            player4Id: selectedPlayers[4].id,
            leagueIdList: selectedLeagues.map(league => league.id)
        }
        axios.post(config.url + "/create-new-roster", body)

        navigate("/rosters", { replace: true });
    }

    const backButtonClicked = () => {
        navigate("/rosters", { replace: true });
    }

    return (
        <div className="mainPage createRoster">

            <div className="titleDiv">
                <h2 className="pageTitle">Create New Roster</h2>

                <div className="backButton" onClick={() => backButtonClicked()}>
                    <img className="backArrow" src="https://img.icons8.com/external-kmg-design-basic-outline-kmg-design/16/000000/external-left-arrows-kmg-design-basic-outline-kmg-design-1.png"/>
                    Back to My Rosters
                </div>
            </div>


            <div className="rosterOptionsDiv">
                <label className="rosterNameLabel" htmlFor="rosterName">Roster Name:</label>
                <input className="rosterNameInput" type="text" name="rosterName" placeholder="Roster 1" onChange={(e) => setRosterName(e.target.value)} />
            </div>
            <div className="rosterOptionsDiv">
                <label className="rosterNameLabel">
                    Choose Leagues: 
                </label>
                {
                    renderLeaguesDropdown()
                }
            </div>
            

            {
                [1, 2, 3, 4].map(i => renderSection(i))
            }

            {
                Object.keys(selectedPlayers).reduce((acc, player) =>(acc && selectedPlayers[player] !== null), true) && (
                    displaySubmitButton()
                )
            }            
        </div>
    )
}