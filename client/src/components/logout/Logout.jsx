import { useContext, useEffect } from "react";
import * as authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import Path from "../../paths";


const Logout = () => {
    const navigate = useNavigate();
    const { logoutHandler } = useContext(AuthContext);

    useEffect(() => {
        authService.logout()
            .then(() => {
                logoutHandler();
                navigate(Path.Home);
            })
            .catch((e) => {
                logoutHandler();
                navigate(Path.Home);
            });
    }, []);

    return null;
}

export default Logout;

