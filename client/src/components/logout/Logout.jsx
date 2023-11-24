import { useEffect } from "react";
import * as authService from "../../services/authService";
import { useNavigate } from "react-router-dom";


const Logout = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        authService.logout()
        .then(()=>{
            console.log('logout')
        })
        .catch((e) => {
            console.log(e)
            navigate('/');
        });
    })

    return (
        <h1>fdsfsd</h1>
    );
} 

export default Logout;

