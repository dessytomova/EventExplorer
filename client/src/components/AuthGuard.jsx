import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Path from "../paths";
import AuthContext from "../context/authContext";

export default function AuthGuard(props){
    const {isAuthenticated} = useContext(AuthContext)
    
    if(!isAuthenticated){
      
        return <Navigate to={Path.Login}></Navigate>
    }

    return <Outlet />;
}