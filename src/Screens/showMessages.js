import React from "react";
import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from "emoji-picker-react";
import MoodIcon from '@mui/icons-material/Mood';
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import axios from "axios";
import BasicMenu from "../Components/BasicMenu";
import { useSelector , useDispatch } from "react-redux";
import { setCurrentUser } from "../Features/userDetails";
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


const ShowMessages = ()=>{

    let {id} = useParams();
    let dispatch = useDispatch();

    const [user,setUser] = useState(null);
    let [showEmojiPicker,setShowEmojiPicker]=useState(false);
    let [inputText,setInputText] = useState("");
    
    let reciever = useSelector((state)=> state.userDetails.currentUser);
    

    useEffect(()=>{

        dispatch(setCurrentUser(id));
        
        let url = `${BASE_URL}/user/fetch?id=${id}`;
        axios.get(url,{
            
        })
            .then((response)=>{
                console.log(response.data.content.data);
                setUser(response.data.content.data);
            })
            .catch(err=> console.log(err));

    },[id]);  

    
    const handleMessageSend = (event)=>{
        event.preventDefault();
        let formData = new FormData(event.target);
        
        let body = {};
        for(let [key,value] of formData.entries()){
            body[key] = value;
        }

        body['reciever'] = reciever;

        console.log("Body  is ",JSON.stringify(body));

        socket.emit("send",JSON.stringify(body));

        setInputText("");

    }

    socket.on('recieve',(response)=>{
        console.log("Message has been recieved : ",response);
    })

    return(
        <div className="w-full h-full">
            {
               user && <React.Fragment>
                    <header className="w-full py-3 flex flex-row border-b">
                        <Avatar className="ml-5" src={require(`../Assets/${user.avatar}.png`)}/>
                        <div className="ml-2">
                            <h1 className="text-sm font-bold">{user.username}</h1>
                            <p className="text-xs text-green-500 mt">Online</p>
                        </div>
                    </header>
                    <div className="w-full h-full relative">
                        <div style={{height:'480px',overflow:'auto'}} className="w-full">
                            <div className="clear-both w-auto text-sm bg-[#4D47C3] p-3 my-2 ml-2 text-white max-w-[500px] rounded-ss rounded-e">
                                <p>Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>
                            </div>
                            <div className="relative clear-both float-right mr-2 w-auto text-sm p-3 my-2 ml-2 bg-slate-200 max-w-[500px] rounded-s rounded-es">
                                <p>Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>
                                <BasicMenu/>
                            </div>
                            <div className="clear-both w-auto text-sm bg-[#4D47C3] p-3 my-2 ml-2 text-white max-w-[500px] rounded-ss rounded-e">
                                <p>Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>
                            </div>
                            <div className="relative clear-both float-right mr-2 w-auto text-sm p-3 my-2 ml-2 bg-slate-200 max-w-[500px] rounded-s rounded-es">
                                <p>Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>
                                <BasicMenu/>
                            </div>
                            <div className="clear-both w-auto text-sm bg-[#4D47C3] p-3 my-2 ml-2 text-white max-w-[500px] rounded-ss rounded-e">
                                <p>Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>
                            </div>
                            <div className="relative clear-both float-right mr-2 w-auto text-sm p-3 my-2 ml-2 bg-slate-200 max-w-[500px] rounded-s rounded-es">
                                <p>Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>
                                <BasicMenu/>
                            </div><div className="clear-both w-auto text-sm bg-[#4D47C3] p-3 my-2 ml-2 text-white max-w-[500px] rounded-ss rounded-e">
                                <p>Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>
                            </div>
                            <div className="relative clear-both float-right mr-2 w-auto text-sm p-3 my-2 ml-2 bg-slate-200 max-w-[500px] rounded-s rounded-es">
                                <p>Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>
                                <BasicMenu/>
                            </div>
                        </div>
                        <div className="w-full flex justify-around items-center relative mt">
                            <div className="relative">
                                <MoodIcon onClick={()=>setShowEmojiPicker(!showEmojiPicker)} className="cursor-pointer text-orange-600" />
                            </div>
                            <form onSubmit={handleMessageSend} className="w-11/12 flex flex-row justify-around">
                                <TextField
                                    className="w-11/12"
                                    id="outlined-multiline-flexible"
                                    maxRows={4}
                                    placeholder="Type Message"
                                    size="small"
                                    name="message"
                                    value={inputText}
                                    onChange={(e)=> setInputText(e.target.value)}
                                    autoComplete="off"
                                />
                                <button><SendIcon className="text-[#4D47C3]"/></button>
                            </form>
                        </div>
                        {
                            showEmojiPicker && <EmojiPicker className="absolute top-[-500px] left-[10px]"/>
                        }
                    </div>
                </React.Fragment>
            }
        </div>
    )
};

export default ShowMessages;