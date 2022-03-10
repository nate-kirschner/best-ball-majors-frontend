import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AuthMethods from '../authentication/AuthMethods';
import axios from 'axios';
import config from '../../config';
import LeagueCard from './LeagueCard';

import '../../styles/leagues.scss';

export default function Leagues() {

    const Auth = useMemo(() => new AuthMethods(), []);

    const [leaguesList, setLeaguesList] = useState();

    useEffect(() => {
        const username = Auth.getConfirm().username;
        axios.post(config.url + "/get-users-leagues", { username }).then(resp => {
            setLeaguesList(resp.data);
        })
    }, [Auth])

    return (
        <>
            <div className="mainPage leagues">
                <h2 className="leaguePageHeader">My Leagues</h2>
                <div className="leagueButton"><Link to="/create-league">Create New League</Link></div>
                <div className="leagueButton"><Link to="/join-league">Join a League</Link></div>
                {
                    leaguesList && leaguesList.map(league => {
                        return (
                            <LeagueCard 
                                leagueId={league.id} 
                                leagueName={league.league_name} 
                                tournamentList={{1: 'Masters Tournament', 2: 'PGA Championship', 3: 'U.S. Open', 4: 'Open Championship'}}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}