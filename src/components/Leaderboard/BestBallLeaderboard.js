import axios from "axios"
import { useEffect, useState } from "react"
import config from "../../config"
import LeagueCard from "../Leagues/LeagueCard";


export default function BestBallLeaderboard() {

    const [leagueId, setLeagueId] = useState();

    useEffect(() => {
        axios.post(config.url + "/get-league-name", { leagueName: "BestBallTourn" }).then(resp => {
            setLeagueId(resp.data[0].id)
        })
    }, [])

    return (
        <div className="leaderboard mainPage">
            {/* <h2 /> */}
            {leagueId && (
                <LeagueCard 
                    leagueId={leagueId} 
                    leagueName="Best Ball Tournament" 
                    tournamentList={{1: 'Masters Tournament', 2: 'PGA Championship', 3: 'U.S. Open', 4: 'Open Championship'}}
                />
            )}
        </div>
    )
}