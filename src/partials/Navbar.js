import { Avatar, FormControlLabel, Tooltip } from "@mui/material";
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import { Link } from "react-router-dom";
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import { BASE_URL } from "../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const NavBar = ()=>{

    const navigate = useNavigate();

    const handleLogout = async()=>{
        try{
            let url = `${BASE_URL}/user/auth/logout`;
            
            let response = await axios({
                method:"POST",
                url,
                withCredentials: true
            });

            console.log("Successfully logged out...",response);
            sessionStorage.setItem('user','');
            sessionStorage.setItem('token','');
            navigate('/auth/login')
        }
        catch(err){ 
            console.log("Something went bad while logout...",err);
        }
    }

    return(
        <>
            <nav className="h-screen bg-white w-[50px] border-r rounded-lg">
                    <Avatar sx={{ bgcolor: '#4D47C3' , width:'50px' , height:'50px' }} variant="square">
                        <FlutterDashIcon/>
                    </Avatar>
                    <div className="flex h-[80%] flex-col items-center justify-between mt-10">
                        <div className="h-[20%] flex flex-col justify-around">
                            <Tooltip title="Messages" arrow placement="right">
                                <Link to='/messages' className="mb-5">
                                    <Avatar sx={{bgcolor:'#4D47C3'}}>
                                        <MessageIcon/>
                                    </Avatar>
                                </Link>
                            </Tooltip>
                            <Tooltip title="profile" arrow placement="right">
                                <Link to='/profile'>
                                    <Avatar
                                        src={require("../Assets/chewing-gum.png")}
                                        alt="Cheing Gum"
                                    ></Avatar>
                                </Link>
                            </Tooltip>
                        </div>
                        <Tooltip className="cursor-pointer" title="logout" arrow placement="right">
                            <Avatar sx={{bgcolor:'#A0ABBC'}}>
                                <LogoutIcon onClick={handleLogout}/>
                            </Avatar>
                        </Tooltip>
                    </div>
                </nav>
        </>
    )
};

export default NavBar;