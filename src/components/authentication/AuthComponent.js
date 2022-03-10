import { useEffect, useState, useMemo } from "react";
import AuthMethods from "./AuthMethods";
import { useNavigate } from 'react-router-dom';

export default function AuthComponent({ Component }) {

    const Auth = useMemo(() => new AuthMethods(), []);

    const navigate = useNavigate();

    const [confirm, setConfirm] = useState(null);
    const [loaded, setLoaded] = useState(null);

    useEffect(() => {
        if (!Auth.loggedIn()) {
            navigate('/login', { replace: true });
        } else {
            try {
                const authConfirm = Auth.getConfirm();
                setConfirm(authConfirm);
                setLoaded(true)
                
            } catch (err) {
                console.log(err);
                Auth.logout();
                navigate('/login', { replace: true });
            }
        }
    }, [Auth, navigate])

    const display = () => {
        if (loaded) {
            if (confirm) {
                return Component
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    return display();
}