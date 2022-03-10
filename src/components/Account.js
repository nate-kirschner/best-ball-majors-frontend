import AuthMethods from "./authentication/AuthMethods";

import '../styles/account.scss';

export default function Account({ setLoggedIn }) {

    const Auth = new AuthMethods();

    const logout = () => {
        setLoggedIn(false);
        Auth.logout();
    }

    return (
        <div className="mainPage account">
            <h2 className="accountTitle">My Account</h2>

            <label className="usernameLabel">Username:</label>
            <span className="username">{Auth.getConfirm().username}</span>

            <button className="signoutButton" onClick={() => logout()}>Sign Out</button>
        </div>
    )
}