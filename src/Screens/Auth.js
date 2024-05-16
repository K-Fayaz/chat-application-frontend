import {Link, Outlet} from "react-router-dom";

const UserAuth = ()=>{

    const state = window.location.href.split("/").slice(-1);

    return(
        <>
            <div className="w-full h-screen flex flex-row">
                <section className="h-full w-1/2">
                    <div className="h-2/5 flex flex-col justify-end pl-24">
                        <h1 className="text-4xl font-bold">Sign In to Tuvi</h1>
                        <p className="mt-2 text-sm font-semibold">A simple Secure chat application..</p>
                    </div>
                    <div className="h-1/2 flex pl-24 mt-5">
                        {
                            state === 'register' ? <p className="w-1/2">If you dont have an account you can <Link style={{color: "#4D47C3"}} to='/auth/register'>Register here!</Link></p>
                                                 : <p className="w-1/2">Already have an account ? <Link style={{color: "#4D47C3"}} to='/auth/login'>Login here!</Link></p> 
                        }
                        <img style={{height:'100%'}} src={require("../Assets/Saly.png")}/> 
                    </div>
                </section>
                <Outlet/>
            </div>
        </>
    )
};


export default UserAuth;