import Menu from './Menu';
import bestBallLogo from '../images/bestBall - wht.png';
import { useNavigate } from "react-router-dom";


import '../styles/header.scss';

export default function Header({ loggedIn }) {

    const navigate = useNavigate();


    return (
        <div className="header">
            <p style={{ display: "none" }}>Best Ball Majors. Fantasy golf Best Ball is back! Make rosters each week, compete with your friends in custom leagues, and enter the Best Ball Tournament!</p>
            <img src={bestBallLogo} className="bestBallLogo" alt="Best Ball Majors Logo"
                onClick={() => navigate("/", { replace: true })}
            />
            <Menu loggedIn={loggedIn} />
        </div>
    )
}