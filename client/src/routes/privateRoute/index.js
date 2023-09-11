import React,{ useContext} from "react";

import { Navigate } from 'react-router-dom';
import { AuthContext } from "./../../component/login-components/authContext"

export function PrivateRoute({children}){

    const {auth} = useContext(AuthContext)
   

    return auth ? children : <Navigate to ="/" />
}