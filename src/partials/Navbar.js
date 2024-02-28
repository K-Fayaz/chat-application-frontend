import { Avatar, FormControlLabel, Tooltip } from "@mui/material";
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import { Link } from "react-router-dom";
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';


const NavBar = ()=>{
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
                        <Tooltip title="logout" arrow placement="right">
                            <Avatar sx={{bgcolor:'#A0ABBC'}}>
                                <LogoutIcon/>
                            </Avatar>
                        </Tooltip>
                    </div>
                </nav>
        </>
    )
};

export default NavBar;