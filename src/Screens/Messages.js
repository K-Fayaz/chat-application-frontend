import NavBar from "../partials/Navbar"; 
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import { MaterialUISwitch } from "../Components/styledSwitch";
import FormGroup from '@mui/material/FormGroup';
import {FormControlLabel} from "@mui/material";
import "../CSS/customScroll.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {BASE_URL} from "../constants";
import axios, { all } from "axios";
import { useSelector , useDispatch } from "react-redux";
import { setAllUsers,setCurrentUser } from "../Features/userDetails";
import socket from "../Utils/socket";

let seedData = [
    {
        image:'chewing-gum.png',
        username:'Oleg Shatrava',
        time:'11:45 pm',
        message:'Is the date of general meeting already known ?',
        badgeContent:100
    },
    {
        image:'batman.png',
        username:'Regina Polyakova',
        time:'10:25 am',
        message:'Oh,there is such a bunch of email, I cant find yours among...',
        badgeContent:3
    },
    {
        image:'rabbit.png',
        username:'Yakov Shubin',
        time:'09:45 am',
        message:'I came up with this idea after visiting an art exhibition...',
        badgeContent:0,
    },
    {
        image:'cat.png',
        username:'Gleb Tarasov',
        time:'01:18 pm',
        message:'Try to think over the chronology of the events again...',
        badgeContent:1
    },
    {
        image:'man (1).png',
        username:'Alvert Konovolov',
        time:'Yesterday at 11:20 am',
        message:'Wow, I definetly like it , check your shcedule and ring me back!!',
        badgeContent:4,
    },
    {
        image:'woman (1).png',
        username:'Vetta Timonova',
        time:'Yesterday at 5:56 pm',
        message:'We need to consult three tings in our actions tomorrow.',
        badgeContent:0
    }
]

const Messages = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [users,setUsers] = useState([]);
    const [searchText,setSearchText] = useState('');

    let allUsers = useSelector((state)=> state.userDetails.allUsers);


    useEffect(()=>{
        let url = `${BASE_URL}/user/fetch/all`;

        axios({
            method:"GET",
            url: url,
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials: true
        })
        .then((response)=>{
            console.log(response.data.content);
            setUsers(response.data.content.data)
            dispatch(setAllUsers(response.data.content.data));
        })
        .catch(err => console.log(err));

    },[]);

    socket.connect();


    const handleSearchInput = (e)=>{
        setSearchText(e.target.value);
        if(e.target.value.length === 0) {
            setUsers(allUsers);
            return;
        }

        let newSet = users.filter(item=>{
            return item.username.toLowerCase().includes(e.target.value.toLowerCase());
        });

        newSet.length ? setUsers(newSet) : setUsers(allUsers);
    }


    const handleNavigate = (id)=>{
        setUsers(allUsers);
        setSearchText('');
        navigate(`/${id}`);
    }

    return(
        <>
            <main className="flex font-sans font-body"> 
                <NavBar/>
                <section className="w-full">
                    <header className="h-[50px] border-b bg-white flex flex-row items-center justify-between">
                        <div className="flex items-center">
                            <KeyboardDoubleArrowRightIcon/>
                            <h1 className="ml-1 text-lg font-bold">Messages</h1>
                        </div>
                        <div className="flex flex-row justify-around items-center">
                            <FormGroup>
                                <FormControlLabel 
                                    control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                                />
                            </FormGroup>
                            <Avatar
                                className="mr-10"
                                src={require("../Assets/chewing-gum.png")}
                            ></Avatar>
                        </div>
                    </header>
                    <div style={{height:'92vh',overflow:'hidden'}} className="w-full flex flex-row">
                        <div style={{overflowY:'auto'}} className="w-1/4 h-full border-r smooth-scroll">
                            <div className="container z-10 sticky top-0 bg-white flex justify-center py-2">
                                <TextField
                                    className="w-11/12"
                                    size="small"
                                    id="input-with-icon-textfield"
                                    value={searchText}
                                    onChange={handleSearchInput}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment  className="text-sm font-bold" position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                    variant="outlined"
                                />
                            </div>
                            {
                                users.map((item,index)=>(
                                    <div key={item._id} onClick={()=> handleNavigate(item._id) } className="flex flex-row py-3 px-2 border-b z-0 cursor-pointer">
                                        <Avatar className="" src={require('../Assets/'+item.avatar+'.png')}/>
                                        <div className="w-full">
                                            <div className="flex flex-row justify-between">
                                                <div className="ml-2">
                                                    <h1 className="text-sm font-bold">{item.username}</h1>
                                                    <p className="text-slate-400 text-xs">11:40 am</p>
                                                </div>
                                                {
                                                    item.badgeContent > 0
                                                    && 
                                                    <Badge size="small" max={10} className="mr-4" badgeContent={5} color="primary">
                                                        <MailIcon/>
                                                    </Badge>
                                                }
                                            </div>
                                            <div className="text-xs text-500 ml-2 mt-2">
                                            Oh,there is such a bunch of email, I cant find yours among...
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="w-3/4 h-full">
                            <Outlet/>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
};


export default Messages;