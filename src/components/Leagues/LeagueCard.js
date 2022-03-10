import axios from "axios";
import React, { useEffect, useState } from "react"
import config from "../../config";

import '../../styles/leagueCard.scss';

export default function LeagueCard({ leagueId, leagueName, tournamentList }) {

    const [leagueMemberInfo, setLeagueMemberInfo] = useState();

    useEffect(() => {
        const body = {
            leagueTournamentIds: Object.keys(tournamentList).map(Number),
            leagueId,
        }
        axios.post(config.url + "/get-league-info", body).then(resp => {
            setLeagueMemberInfo(resp.data);
        })
    }, [leagueId, leagueName, tournamentList])

    return (
        <div className="leagueCard">
            <div className="leagueTitleDiv">
                <h3 className="leagueName">{leagueName}</h3>
            </div>
            <div className="leaguePlayersDiv">
                <div className="row playersCardHeaders">
                    <div className="leagueHeader"
                        style={{
                            width: `${100 / (Object.keys(tournamentList).length + 2)}%`
                        }}
                    ><h4>Member</h4></div>
                    {
                        Object.keys(tournamentList).map(tourn => {
                            return (
                                <div className="leagueHeader"
                                    style={{
                                        width: `${100 / (Object.keys(tournamentList).length + 2)}%`
                                    }}
                                >
                                    <h4>{tournamentList[tourn]}</h4>
                                </div>)
                        })
                    }
                    <div className="leagueHeader total"
                        style={{
                            width: `${100 / (Object.keys(tournamentList).length + 2)}%`
                        }}
                    ><h4>Total</h4></div>
                </div>
                {
                    leagueMemberInfo && leagueMemberInfo.map(user => {
                        let sum = 0;
                        return (
                            <div className="playerCardRow row">
                                <div className="playerCardData"
                                    style={{
                                        width: `${100 / (Object.keys(tournamentList).length + 2)}%`
                                    }}
                                ><h4>{user.username}</h4></div>
                                {
                                    Object.keys(tournamentList).map(tourn => {
                                        let data = leagueMemberInfo.find(leagueUser => leagueUser.username === user.username).rosters.find(roster => roster.tournament_id == tourn)
                                        if (data) {
                                            sum += data.bestball_total;
                                        }
                                        return (
                                            <div className="playerCardData"
                                                style={{
                                                    width: `${100 / (Object.keys(tournamentList).length + 2)}%`
                                                }}
                                            >
                                                <h4>
                                                    {
                                                        data ? data.bestball_total : "-"
                                                    }
                                                </h4>
                                            </div>
                                        )
                                    })
                                }
                                <div className="playerCardData"
                                    style={{
                                        width: `${100 / (Object.keys(tournamentList).length + 2)}%`
                                    }}
                                ><h4>{sum}</h4></div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}