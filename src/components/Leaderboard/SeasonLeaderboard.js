import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import config from '../../config';
import AuthMethods from '../authentication/AuthMethods';
import LeagueCard from '../Leagues/LeagueCard';

import '../../styles/seasonLeaderboard.scss';

export default function SeasonLeaderboard() {

    const Auth = useMemo(() => new AuthMethods(), []);

    const [allTournaments, setAllTournaments] = useState();
    const [selectedTournament, setSelectedTournament] = useState();

    const [allUserLeagues, setAllUserLeagues] = useState();
    const [selectedLeague, setSelectedLeague] = useState();

    useEffect(() => {
        axios.post(config.url + "/get-all-tournaments").then(resp => {
            setAllTournaments(resp.data);
            setSelectedTournament(resp.data[0].id)
        })
        const username = Auth.getConfirm().username;
        axios.post(config.url + "/get-users-leagues", { username }).then(resp => {
            setAllUserLeagues(resp.data)
            setSelectedLeague(resp.data[0].id)
        })
    }, [])

    return (
        <div className="seasonLeaderboard mainPage">
            {
                allTournaments && (
                    <select 
                        className="tournamentSelect" 
                        onChange={(e) => setSelectedTournament(e.target.value)}
                    >
                        {
                            allTournaments.map(tourn => {
                                return <option value={tourn.id}>{tourn.tournament_name}</option>
                            })
                        }
                    </select>
                )
            }
            {
                allUserLeagues && (
                    <select 
                        className="leagueSelect"
                        onChange={(e) => setSelectedLeague(e.target.value)}
                    >
                        {
                            allUserLeagues.map(league => {
                                return (
                                    <option value={league.id}>
                                        {league.league_name === "BestBallTourn" ? "Best Ball Tournament" : league.league_name}
                                    </option>
                                )
                            })
                        }
                    </select>
                )
            }
            
            {
                selectedTournament && selectedLeague && (
                    <LeagueCard 
                        leagueId={allUserLeagues.filter(league => league.id == selectedLeague)[0].id}
                        leagueName={allUserLeagues.filter(league => league.id == selectedLeague)[0].league_name}
                        tournamentList={{ [selectedTournament]: allTournaments.filter(tourn => tourn.id == selectedTournament)[0].tournament_name }}
                    />
                )
            }
            
        </div>
    )
}