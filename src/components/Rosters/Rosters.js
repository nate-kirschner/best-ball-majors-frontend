import axios from "axios";
import { useEffect, useState, useMemo } from "react"
import AuthMethods from "../authentication/AuthMethods"
import config from "../../config";
import RosterCard from "./RosterCard";
import { Link } from "react-router-dom";

import "../../styles/rosters.scss";

export default function Rosters({ canCreateRoster }) {

    const Auth = useMemo(() => new AuthMethods(), []);

    const [rosterList, setRosterList] = useState();

    useEffect(() => {
        const username = Auth.getConfirm().username;
        axios.post(config.url + "/get-all-users-rosters", { username }).then(resp => {
            setRosterList(resp.data);
        })
    }, [Auth])

    return (
            <div className="mainPage rosters">
                <h2 className="rostersPageHeader">My Rosters</h2>
                {
                    canCreateRoster && <Link className="createRosterButton" to="/create-roster">Create New Roster</Link>
                }
                {
                    rosterList && rosterList.map(roster => {
                        const rosterData = {
                            rosterId: roster.id,
                            rosterName: roster.roster_name,
                            tournamentId: roster.tournament_id,
                            player1Id: roster.player_1_id,
                            player2Id: roster.player_2_id,
                            player3Id: roster.player_3_id,
                            player4Id: roster.player_4_id,
                            bestBallRound1: roster.bestBallRound1,
                            bestBallRound2: roster.bestBallRound2,
                            bestBallRound3: roster.bestBallRound3,
                            bestBallRound4: roster.bestBallRound4,
                            bestBallTotal: roster.bestball_total
                        }
                        return <RosterCard rosterData={rosterData} canCreateRoster={canCreateRoster} />
                    })
                }
            </div>
            )
}