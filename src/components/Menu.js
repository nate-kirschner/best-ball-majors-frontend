import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../styles/menu.scss';
import useWindowDimensions from './hooks/windowSizeHook';
import useOutsideClickedAction from './hooks/useOutsideClickedAction';

export default function Menu({ loggedIn }) {

    const [contestsMenuOpen, setContestsMenuOpen] = useState(false);
    const [leaderboardMenuOpen, setLeaderboardMenuOpen] = useState(false);
    const [infoMenuOpen, setInfoMenuOpen] = useState(false);

    const contestsRef = useRef();
    const leaderboardRef = useRef();
    const infoRef = useRef();

    const [menuOpen, setMenuOpen] = useState(false);

    const { width } = useWindowDimensions();

    const smallScreenMenuRef = useRef();
    useOutsideClickedAction(smallScreenMenuRef, setMenuOpen);

    const display = () => {
        if (width >= 768) {
            let menuDropdownPosition;
            let dropdownLeft;
            let dropdownTop;
            let dropdownWidth;
            if (contestsMenuOpen) {
                menuDropdownPosition = "2";
                dropdownLeft = contestsRef.current.offsetLeft;
                dropdownTop = contestsRef.current.offsetTop + contestsRef.current.offsetHeight;
                dropdownWidth = contestsRef.current.offsetWidth;
            } else if (leaderboardMenuOpen) {
                menuDropdownPosition = "3";
                dropdownLeft = leaderboardRef.current.offsetLeft;
                dropdownTop = leaderboardRef.current.offsetTop + leaderboardRef.current.offsetHeight;
                dropdownWidth = leaderboardRef.current.offsetWidth;
            } else if (infoMenuOpen) {
                menuDropdownPosition = "4";
                dropdownLeft = infoRef.current.offsetLeft;
                dropdownTop = infoRef.current.offsetTop + infoRef.current.offsetHeight;
                dropdownWidth = infoRef.current.offsetWidth;
            }
            return (
                <div className="menu">
                    <h3 className="menuItem"><Link to="/">Home</Link></h3>
                    <h3 className={"menuItem " + (contestsMenuOpen ? "open" : "closed")}
                        onMouseEnter={() => setContestsMenuOpen(true)}
                        onMouseLeave={() => setContestsMenuOpen(false)}
                        ref={contestsRef}
                    >Contests</h3>
                    <h3 className={"menuItem " + (leaderboardMenuOpen ? "open" : "closed")}
                        onMouseEnter={() => setLeaderboardMenuOpen(true)}
                        onMouseLeave={() => setLeaderboardMenuOpen(false)}
                        ref={leaderboardRef}
                    >Leaderboard</h3>
                    <h3 className={"menuItem " + (infoMenuOpen ? "open" : "closed")}
                        onMouseEnter={() => setInfoMenuOpen(true)}
                        onMouseLeave={() => setInfoMenuOpen(false)}
                        ref={infoRef}
                    >Info</h3>
                    {
                        loggedIn ? 
                        <h3 className="menuItem"><Link to="/account">Account</Link></h3> 
                        :
                        <h3 className="menuItem"><Link to="/login">Login/Signup</Link></h3>
                    }
                    
                    <div className="menuDropdown"
                        onMouseEnter={() => {
                            if (contestsMenuOpen) {
                                setContestsMenuOpen(true)
                            } else if (leaderboardMenuOpen) {
                                setLeaderboardMenuOpen(true)
                            } else if (infoMenuOpen) {
                                setInfoMenuOpen(true)
                            }
                        }}
                        onMouseLeave={() => {
                            setContestsMenuOpen(false)
                            setLeaderboardMenuOpen(false)
                            setInfoMenuOpen(false)
                        }}
                        style={{ 
                            left: `calc(${dropdownLeft}px + ${dropdownWidth / 2}px)`, 
                            top: `calc(${dropdownTop + 5}px)`,
                        }}
                    >
                        {
                            contestsMenuOpen && (
                                <>
                                    <Link to="/rosters"><h4 className="menuItemsItem">Rosters</h4></Link>
                                    <Link to="/leagues"><h4 className="menuItemsItem">Leagues</h4></Link>
                                </>
                            )
                        }
                        {
                            leaderboardMenuOpen && (
                                <>
                                    <Link to="/best-ball-leaderboard"><h4 className="menuItemsItem">Best Ball</h4></Link>
                                    <Link to="/leaderboard"><h4 className="menuItemsItem">Season</h4></Link>
                                </>
                            )
                        }
                        {
                            infoMenuOpen && (
                                <>
                                    <Link to="/about-us"><h4 className="menuItemsItem">About Us</h4></Link>
                                    <Link to="/how-to-play"><h4 className="menuItemsItem">How To Play</h4></Link>
                                </>
                            )
                        }
                    </div>
                </div>
            )
        } else {
            return smallerScreenMenu();
        }
    }

    const smallerScreenMenu = () => {
        return (
            <div className="menu smallScreen" ref={smallScreenMenuRef}>
                <h3 className="menuTitle" onClick={() => setMenuOpen(true)}>Menu</h3>
                {
                    menuOpen && (
                        <div className={"menuPullout " + (menuOpen ? "open" : "closed")} >
                    
                                <Link to="/" onClick={() => setMenuOpen(false)}><h3 className="menuItem">Home</h3></Link>


                                <h3 className={"menuItem"}
                                    onClick={() => setContestsMenuOpen(!contestsMenuOpen)}
                                >
                                    Contests
                                    <img className="dropdownArrowMenu" src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/ffffff/external-down-arrows-those-icons-lineal-those-icons-1.png"/>
                                </h3>
                                <div className={"dropdown " + (contestsMenuOpen ? "open" : "closed")}>
                                    <Link to="/rosters"><h4 
                                        className="menuItemsItem"
                                        onClick={() => {setContestsMenuOpen(false); setMenuOpen(false); }}
                                    >Rosters
                                    </h4></Link>
                                    <Link to="/leagues"><h4 
                                        className="menuItemsItem"
                                        onClick={() => {setContestsMenuOpen(false); setMenuOpen(false); }}
                                    >Leagues
                                    </h4></Link>
                                </div>
                                
                                <h3 className={"menuItem"}
                                    onClick={() => setLeaderboardMenuOpen(!leaderboardMenuOpen)}
                                >
                                    Leaderboard
                                    <img className="dropdownArrowMenu" src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/ffffff/external-down-arrows-those-icons-lineal-those-icons-1.png"/>
                                </h3>
                                <div className={"dropdown " + (leaderboardMenuOpen ? "open" : "closed")}>
                                    <Link to="/best-ball-leaderboard"><h4 
                                        className="menuItemsItem"
                                        onClick={() => {setLeaderboardMenuOpen(false); setMenuOpen(false); }}
                                    >Best Ball
                                    </h4></Link>
                                    <Link to="/leaderboard"><h4 
                                        className="menuItemsItem"
                                        onClick={() => {setLeaderboardMenuOpen(false); setMenuOpen(false); }}
                                    >Season
                                    </h4></Link>
                                </div>

                                <h3 className={"menuItem"}
                                    onClick={() => setInfoMenuOpen(!infoMenuOpen)}
                                >
                                    Info
                                    <img className="dropdownArrowMenu" src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/ffffff/external-down-arrows-those-icons-lineal-those-icons-1.png"/>
                                </h3>
                                <div className={"dropdown " + (infoMenuOpen ? "open" : "closed")}>
                                    <Link to="/about-us"><h4 
                                        className="menuItemsItem"
                                        onClick={() => {setInfoMenuOpen(false); setMenuOpen(false); }}
                                    >About Us
                                    </h4></Link>
                                    <Link to="/how-to-play"><h4 
                                        className="menuItemsItem"
                                        onClick={() => {setInfoMenuOpen(false); setMenuOpen(false); }}
                                    >How To Play
                                    </h4></Link>
                                </div>
                                {
                                    loggedIn ? 
                                    <Link to="/account" onClick={() => setMenuOpen(false)}><h3 className="menuItem">Account</h3></Link>
                                    :
                                    <Link to="/login" onClick={() => setMenuOpen(false)}><h3 className="menuItem">Login/Signup</h3></Link>
                                }

                            </div>
                    )
                }
            </div>
        )
    }

    return display();
        
}