import { useEffect, useState } from "react";
import axios from 'axios';
import config from '../config';
import useWindowDimensions from "./hooks/windowSizeHook";
import Scorecard from "./Scorecard";

import '../styles/home.scss';
import '../styles/defaults.scss';

export default function Home() {

    const [currentTournament, setCurrentTournament] = useState(null);
    const [data, setData] = useState(null);
    const [scorecardData, setScorecardData] = useState(null);
    
    const { width } = useWindowDimensions();

    useEffect(() => {
        axios.get(config.url + '/get-all-current-tournament-info').then(resp => {
            setCurrentTournament(resp.data.currentTournament);
            setData(resp.data.data);
        })
    }, [])

    const buildRow = (rowData) => {
        return (
            <>
                <div className="row dataRow" 
                    onClick={() => scorecardData === rowData ? setScorecardData(null) : setScorecardData(rowData)}
                    >
                    <div className="data">{rowData.position ? rowData.position : '-'}</div>
                    <div className="data">{rowData.playerName ? rowData.playerName : '-'}</div>
                    <div className="data">{rowData.round1Score ? rowData.round1Score : '-'}</div>
                    <div className="data">{rowData.round2Score ? rowData.round2Score : '-'}</div>
                    <div className="data">{rowData.round3Score ? rowData.round3Score : '-'}</div>
                    <div className="data">{rowData.round4Score ? rowData.round4Score : '-'}</div>
                    <div className="data">{rowData.totalScore ? rowData.totalScore : '-'}</div>
                </div>
                {
                    !!scorecardData && scorecardData.totalScore && (scorecardData.playerId === rowData.playerId) && (
                        <div>
                            <div colSpan="7"><Scorecard data={scorecardData} /></div>
                        </div>
                    )
                    
                }
            </>
        )
    }

    const buildSmallScreenRow = (rowData) => {
        return (
            <>
                <div className="row"
                    onClick={() => scorecardData === rowData ? setScorecardData(null) : setScorecardData(rowData)}
                >
                    <div className="data">{rowData.position ? rowData.position : '-'}</div>
                    <div className="data">{rowData.playerName ? rowData.playerName : '-'}</div>
                    <div className="data">{rowData.totalScore ? rowData.totalScore : '-'}</div>
                </div>
                {
                    scorecardData && (scorecardData.playerId === rowData.playerId) && (
                        <div>
                            <div colSpan="7"><Scorecard data={scorecardData} /></div>
                        </div>
                    )
                    
                }
            </>
        )
    }

    const display = () => {
        if (currentTournament && data) {
            return (
                <div className="mainPage home">
                    <h2 className="tournamentName">{currentTournament ? currentTournament.tournament_name : ""}</h2>
                    <div className="currentTournamentBlock">
                    <div className="tournamentTable">
                        {
                            width >= 768 ? largerScreenTable() : smallerScreenTable()
                        }
                    </div>
                        
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    Loading...
                </div>
            )
        }
    }

    const largerScreenTable = () => {
        return (
            <>
                <div>
                    <div className="row headerRow">
                        <div className="tableHeader">Position</div>
                        <div className="tableHeader">Name</div>
                        <div className="tableHeader">Round 1</div>
                        <div className="tableHeader">Round 2</div>
                        <div className="tableHeader">Round 3</div>
                        <div className="tableHeader">Round 4</div>
                        <div className="tableHeader">Total</div>
                    </div>
                </div>
                <div>
                    {
                        data.map(row => {
                            return buildRow(row);
                        })
                    }
                </div>
            </>
        )
    }

    const smallerScreenTable = () => {
        return (
            <>
                <div className="row headerRow">
                    <div className="tableHeader">Position</div>
                    <div className="tableHeader">Name</div>
                    <div className="tableHeader">Total</div>
                </div>
                <div>
                    {
                        data.map(row => {
                            return buildSmallScreenRow(row);
                        })
                    }
                </div>
            </>
        )
    }
    

    return display();
}