import axios from "axios";
import { useEffect, useState, useRef } from "react";
import config from "../../config";

import "../../styles/rosterCard.scss";

export default function RosterCard({ rosterData }) {

    const {
        rosterId,
        rosterName,
        tournamentId,
        player1Id,
        player2Id,
        player3Id,
        player4Id,
        bestBallRound1,
        bestBallRound2,
        bestBallRound3,
        bestBallRound4,
        bestBallTotal
    } = rosterData

    const [tournamentName, setTournamentName] = useState();
    const [player1, setPlayer1] = useState();
    const [player2, setPlayer2] = useState();
    const [player3, setPlayer3] = useState();
    const [player4, setPlayer4] = useState();
    const [leagues, setLeagues] = useState();

    const [selectedRound, setSelectedRound] = useState("total");

    const [parData, setParData] = useState();
    const [scorecardData, setScorecardData] = useState();
    const [bestBallData, setBestBallData] = useState();

    useEffect(() => {
        axios.post(config.url + "/get-individual-roster-data", rosterData).then(resp => {
            setTournamentName(resp.data.tournamentName);
            setPlayer1(resp.data.player1);
            setPlayer2(resp.data.player2);
            setPlayer3(resp.data.player3);
            setPlayer4(resp.data.player4);
            setLeagues(resp.data.leagues);
        })
        
    }, [])

    useEffect(() => {
        const params = {
            tournamentId, 
            player1Id,
            player2Id,
            player3Id,
            player4Id
        }
        axios.post(config.url + "/get-roster-scorecard-data", params).then(resp => {
            setParData(resp.data.parHoles);
            setScorecardData({
                player1: resp.data.player1Holes,
                player2: resp.data.player2Holes,
                player3: resp.data.player3Holes,
                player4: resp.data.player4Holes,
            })
            setBestBallData(resp.data.bestBallScores)
        })
    }, [])

    const buildRows = () => {
        const playersList = [
            { ...scorecardData.player1, ...player1 }, 
            { ...scorecardData.player2, ...player2 }, 
            { ...scorecardData.player3, ...player3 }, 
            { ...scorecardData.player4, ...player4 } ] 
        let playerRows = playersList.map(player => buildPlayerRow(player));
        playerRows.push(buildBestBallRow());
        return playerRows;
    }

    const buildBestBallRow = () => {
        if ( selectedRound === "total") {
            return (
                <div className="row playerCardRow">
                    <p className="playerCardData">Best Ball</p>
                    <p className="playerCardData">{bestBallRound1 ? bestBallRound1 : "-"}</p>
                    <p className="playerCardData">{bestBallRound2 ? bestBallRound2 : "-"}</p>
                    <p className="playerCardData">{bestBallRound3 ? bestBallRound3 : "-"}</p>
                    <p className="playerCardData">{bestBallRound4 ? bestBallRound4 : "-"}</p>
                    <p className="playerCardData">{bestBallTotal ? bestBallTotal : "-"}</p>
                </div>
            )
        } else {
            return (
                <div className="row scorecardDiv">
                    <p className="scorecardData">Best Ball</p>
                    {
                        displayScoreData(bestBallData)
                    }
                </div>
            )
        }
        
    }

    const buildPlayerRow = (player) => {
        if (selectedRound === "total") {
            if (player) {
                return (
                    <div className="row playerCardRow">
                        <p className="playerCardData">{player.playerName ? player.playerName : "-"}</p>
                        <p className="playerCardData">{player.round1 ? player.round1 : "-"}</p>
                        <p className="playerCardData">{player.round2 ? player.round2 : "-"}</p>
                        <p className="playerCardData">{player.round3 ? player.round3 : "-"}</p>
                        <p className="playerCardData">{player.round4 ? player.round4 : "-"}</p>
                        <p className="playerCardData">{player.total ? player.total : "-"}</p>
                    </div>
                )
            } else {
                return null;
            }
        } else {
            return (
                <div className="row scorecardDiv">
                    <p className="scorecardData">{player.playerName ? player.playerName : "-"}</p>
                    {
                        displayScoreData(player)
                    }
                </div>
            )
        }
    }

    const showPar = () => {
        if (selectedRound !== "total") {
            return (
                <>
                    <div className="row scorecardDiv scorecardHeaderDiv">
                        <h5 className="scorecardData title">Hole</h5>
                        <h5 className="scorecardData">1</h5>
                        <h5 className="scorecardData">2</h5>
                        <h5 className="scorecardData">3</h5>
                        <h5 className="scorecardData">4</h5>
                        <h5 className="scorecardData">5</h5>
                        <h5 className="scorecardData">6</h5>
                        <h5 className="scorecardData">7</h5>
                        <h5 className="scorecardData">8</h5>
                        <h5 className="scorecardData">9</h5>
                        <h5 className="scorecardData">10</h5>
                        <h5 className="scorecardData">11</h5>
                        <h5 className="scorecardData">12</h5>
                        <h5 className="scorecardData">13</h5>
                        <h5 className="scorecardData">14</h5>
                        <h5 className="scorecardData">15</h5>
                        <h5 className="scorecardData">16</h5>
                        <h5 className="scorecardData">17</h5>
                        <h5 className="scorecardData">18</h5>
                    </div>
                    <div className="row scorecardDiv">
                        <h5 className="scorecardData title">Par</h5>
                        {
                            displayParData(parData)
                        }
                    </div>
                </>
            )
        } else {
            return null;
        }
    }

    const displayParData = (parData) => {
        let data = [];
        for (let i = 1; i < 19; i += 1) {
            const keyString = "hole_" + i;
            if (parData[keyString]) {
                data.push(<h5 className="scorecardData">{parData[keyString]}</h5>)
            } else {
                data.push(<h5 className="scorecardData">-</h5>)
            }
        }
        return data;
    }

    const displayScoreData = (playerData) => {
        let round;
        if (selectedRound === "round1") {
            // temporary fix since player data is 0 indexed and best ball score is 1 indexed
            round = playerData.playerId ? 0 : 1;
        } else if (selectedRound === "round2") {
            round = playerData.playerId ? 1 : 2;
        } else if (selectedRound === "round3") {
            round = playerData.playerId ? 2 : 3;
        } else if (selectedRound === "round4") {
            round = playerData.playerId ? 3 : 4;
        }
        let keyString;
        let data = []
        for (let i = 1; i < 19; i += 1) {
            keyString = "hole_" + i;
            if (playerData[round] && playerData[round][keyString]) {
                const overUnderColor = (parData[keyString] - playerData[round][keyString]).toString();
                data.push(<h5 className="scorecardData" style={{ color: `${colors[overUnderColor]}` }}>{playerData[round][keyString]}</h5>)
            } else {
                data.push(<h5 className="scorecardData">{playerData.playerId ? "-" : "0"}</h5>)
            }
        }
        return data;
    }

    return (
        <div className="rosterCard">
            <div className="rosterTitleDiv">
                <h3 className="rosterName">{rosterName}</h3>
                <h3 className="rosterTournamentName">{tournamentName}</h3>
                {
                    <DisplayLeagues leagues={leagues} />
                }
            </div>
            <div className="rosterPlayersDiv">
                <div className="row playersCardHeaders">
                    <h4 className="rosterHeader">Name</h4>
                    <h4 className={"rosterHeader " + (selectedRound === "round1" ? "selected" : "")} 
                        onClick={() => setSelectedRound("round1")}
                    >Round 1</h4>
                    <h4 className={"rosterHeader " + (selectedRound === "round2" ? "selected" : "")} 
                        onClick={() => setSelectedRound("round2")}
                    >Round 2</h4>
                    <h4 className={"rosterHeader " + (selectedRound === "round3" ? "selected" : "")} 
                        onClick={() => setSelectedRound("round3")}
                    >Round 3</h4>
                    <h4 className={"rosterHeader " + (selectedRound === "round4" ? "selected" : "")} 
                        onClick={() => setSelectedRound("round4")}
                    >Round 4</h4>
                    <h4 className={"rosterHeader " + (selectedRound === "total" ? "selected" : "")} 
                        onClick={() => setSelectedRound("total")}
                    >Total</h4>
                </div>
                <div className="parAndScorecardsDiv">
                    {
                        showPar()
                    }
                    {
                        scorecardData && buildRows()
                    }
                </div>
            </div>
        </div>
    )
}

const DisplayLeagues = ({ leagues }) => {

    const leaguesTextRef = useRef();
    const [anchor, setAnchor] = useState(null);
    const [style, setStyle] = useState({})

    const handlePopoverOpen = (e) => {
        setAnchor(e.currentTarget);
        const { offsetTop, offsetLeft, clientHeight, clientWidth } = leaguesTextRef.current
        setStyle({
            ...style,
            left: `calc(${offsetLeft + (clientWidth / 2)}px)`,
            top: `${offsetTop + clientHeight + 5}px`,
            transform: 'translateX(-50%)'
        })
    }

    const handlePopoverClose = () => {
        setAnchor(null);
    }

    return (
        <>
            <h3 className="rosterLeaguesDropdown" 
                onMouseEnter={handlePopoverOpen}
                onClick={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                ref={leaguesTextRef}
            >
                Leagues
                <img className="dropdownArrow" src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/000000/external-arrow-arrows-those-icons-lineal-color-those-icons-1.png"/>

                {/* 
                    Icons8 link
                    Insert somewhere on page

                    <a href="https://icons8.com/icon/kuUwIi4UBqyH/arrow">Arrow icon by Icons8</a>
                */}
            </h3>
            {
                !!anchor && (
                    <div className="popover"
                        style={style}
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >
                        {
                            leagues.map(league => {
                                return (
                                    <p>{league.league_name}</p>
                                )
                            })
                        }
                    </div>
                )
            }
            
        </>
    )
}

const colors = {
    '-2': 'rgba(233, 210, 0, 1)',
    '-1': 'rgba(246, 6, 6, 1)',
    '0': 'black',
    '1': 'rgba(6, 214, 6, 1)',
    '2': '',
}