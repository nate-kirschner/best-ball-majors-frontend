import axios from "axios"
import { useEffect, useState } from "react"
import config from "../../config"
import LeagueCard from "../Leagues/LeagueCard";


export default function BestBallLeaderboard() {

    const [leagueId, setLeagueId] = useState();
    const [tournamentList, setTournamentList] = useState();

    useEffect(() => {
        axios.post(config.url + "/get-league-name", { leagueName: "BestBallTourn" }).then(resp => {
            setLeagueId(resp.data[0].id)
        })
        const tournamentNames = ["Masters Tournament", "PGA Championship", "U.S. Open", "Open Championship"]
        axios.post(config.url + "/get-tournament-ids", { tournamentNames }).then(resp => {
            const tournamentListTemp = {};
            resp.data.forEach(tourn => {
                tournamentListTemp[tourn.id] = tourn.tournament_name
            })
            let count = -1;
            tournamentNames.forEach(name => {
                if (!Object.values(tournamentListTemp).includes(name)) {
                    tournamentListTemp[count] = name;
                    count++;
                }
            })
            setTournamentList(tournamentListTemp)
        })
    }, [])

    return (
        <div className="leaderboard mainPage">
            {leagueId && tournamentList && (
                <LeagueCard 
                    leagueId={leagueId} 
                    leagueName="Best Ball Tournament" 
                    tournamentList={tournamentList}
                />
            )}
        </div>
    )
}