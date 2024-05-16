import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {

    let id = sessionStorage.getItem('user');
    console.log("Id of the user is ",id)

    if(id && id !== null){
        return <Outlet/>    
    }
    else{
        return (
            <Navigate
                to={{
                    pathname: "/auth/login",             
                }}
            />
        );
    }
  
}