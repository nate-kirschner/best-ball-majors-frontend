import Menu from './Menu';
import bestBallLogo from '../images/bestBall-512x512.png';

import '../styles/header.scss';

export default function Header({ loggedIn, smallScreenMenuRef }) {

    return (
        <div className="header">
            <img src={bestBallLogo} className="bestBallLogo" alt="Best Ball Majors Logo"/>
            <Menu loggedIn={loggedIn} />
        </div>
    )
}