import { Avatar, FormControlLabel, Tooltip } from "@mui/material";
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import { Link } from "react-router-dom";
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import { BASE_URL } from "../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { setLoggedinUser } from "../Features/userDetails";
import socket from "../Utils/socket";


const NavBar = ()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user,setUser] = useState(null)

    const handleLogout = async()=>{
        try{
            let url = `${BASE_URL}/user/auth/logout`;
            
            // let response = await axios({
            //     method:"POST",
            //     url,
            //     headers:{
            //         token: sessionStorage.getItem('token')
            //     },
            //     // withCredentials: true
            // });

            // console.log("Successfully logged out...",response);
            // sessionStorage.setItem('user','');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('avatar');
            sessionStorage.removeItem('chatting_user');
            socket.disconnect();
            // sessionStorage.setItem('token','');
            navigate('/auth/login')
        }
        catch(err){ 
            console.log("Something went bad while logout...",err);
        }
    }

    useEffect(()=>{

        let url = `${BASE_URL}/user/fetch/me`;

        if(sessionStorage.getItem('token') == null || sessionStorage.length == 0) navigate('/auth/login');
        
        axios.get(url,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                 bearer_token: sessionStorage.getItem('token'),
            }
        })
        .then((response)=>{
            console.log("Response avatar is :",response.data.content.data);
            setUser(response.data.content.data.avatar);
            dispatch(setLoggedinUser(response.data.content.data));
        })
        .catch((err)=>{
            console.log("Error has occured!!",err);
        })

    },[]);

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

                                        src={
                                            sessionStorage.getItem('token') ? require('../Assets/'+sessionStorage.getItem('avatar')+'.png')
                                                                            : require("../Assets/batman.png")
                                        }
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