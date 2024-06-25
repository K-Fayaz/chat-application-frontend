import React from "react";
import { Avatar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from "emoji-picker-react";
import MoodIcon from '@mui/icons-material/Mood';
import { useEffect, useState , useRef } from "react";
import { BASE_URL } from "../constants";
import axios from "axios";
import BasicMenu from "../Components/BasicMenu";
import { useSelector , useDispatch } from "react-redux";
import { setCurrentUser } from "../Features/userDetails";
// import { setMessages } from "../Features/messages";
import socket from "../Utils/socket";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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
    const navigate = useNavigate();

    const [user,setUser] = useState(null);
    const [online,setOnline] = useState(false);
    let [showEmojiPicker,setShowEmojiPicker]=useState(false);
    let [inputText,setInputText] = useState("");
    const [messages,setMessages] = useState([]);
    const [editing,setEditing] = useState(false);
    const [editText,setEditText] = useState("");
    const [editTextId,setId] = useState(null);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);
    
    let reciever = useSelector((state)=> state.userDetails.currentUser);
    // let reduxMessages = useSelector((state)=> state.messages.messages);
    

    useEffect(()=>{

        if(!sessionStorage.getItem("token")){
            console.log("You need to login first!!");
            navigate("/auth/login")
            return;
        }

        dispatch(setCurrentUser(id));
        
        let url = `${BASE_URL}/user/fetch?id=${id}`;
        
        // Current chatting user
        axios.get(url,{})
            .then((response)=>{
                console.log(response.data.content.data);
                setUser(response.data.content.data);
                // sessionStorage.setItem('chatting_user',response.data.content.data);
            })
            .catch(err=> console.log(err));
        
            
    },[id]);
        
    useEffect(()=>{
        // Get the messages between these two user
        let message_url = `${BASE_URL}/messages/get/?user1=${sessionStorage.getItem('chatting_user')}&user2=${sessionStorage.getItem('user')}`;

        axios({
            method:"GET",
            url: message_url,
        })
        .then((response)=>{
            console.log("Response is ",response);
            // dispatch(setMessages(response.data.content.data));
            // let messages = useSelector((state)=>state.messages.messages);
            setMessages(response.data.content.data);
        })
        .catch((err)=>{
            console.log("Error has occured: ",err);
        })

    },[user]);

    useEffect(()=>{
        chatEndRef.current?.scrollTo({ top: chatEndRef.current.scrollHeight, behavior: 'smooth' });
    },[messages]);

    
    const handleMessageSend = (event)=>{
        event.preventDefault();
        let formData = new FormData(event.target);
        
        let body = {};
        for(let [key,value] of formData.entries()){
            body[key] = value;
        }

        body['reciever'] = reciever;

        // console.log("Body  is ",JSON.stringify(body));

        socket.emit("send",JSON.stringify(body));

        setInputText("");

    }

    const handleEmojiClick = (emoji)=>{
        let text = `${inputText}${emoji.emoji}`;
        console.log("Value of Input is :", inputRef.current.value)
        setInputText(text);
    }

    const handleClose = ()=>{
        setEditing(false);
        setId(null);
        setEditText("");
    }

    const handleEditFormSubmit = (e)=>{
        e.preventDefault();
        console.log("Edited Message is :",editText);

        if(!editTextId) return;

        let url = `${BASE_URL}/messages/edit/${editTextId}`;
        axios({
            method:"PUT",
            url,
            data: {
                text: editText
            },
            headers:{
                'Content-Type':'application/json',
                'token': sessionStorage?.getItem('token') || null
            }
        })
        .then((response)=>{
            if(response.data.status){
                let newMessages = messages.map((item)=>{
                    if(item._id === editTextId){
                        item.message = editText;
                    }
                    return item;
                })

                setMessages(newMessages);
                socket.emit("edit-message",{ message: response.data.content.data , text: editText });
            }
        })
        .catch((err)=> console.log("Something went wrong: ",err));


        handleClose();
    }

    socket.on('recieve',(response)=>{
        // console.log("Message has been recieved : ",response);
        setMessages([...messages,response]);
    })

    socket.on("message-delete",(response)=>{
        // console.log("Message that is deleted is ",response.messageId);

        let newMessages = messages.filter(item => item._id !== response.messageId );
        // console.log("New Messages are :",newMessages);
        setMessages(newMessages);
    });

    socket.on("edit-message",(response)=>{
        if(!response?.message) return;

        console.log("Edit Response is : ",response);
        // Not so Effcient way to update if there are 1000's of messages ;)
        let newMessages = messages.map((item)=>{
            if(item._id === response?.message._id){
                item.message = response?.text;
            }
            return item;
        });

        setMessages(newMessages);

    })


    return(
        <div className="w-full h-full">
            {
               user && <React.Fragment>
                    <header className="w-full py-3 flex flex-row border-b">
                        <Avatar className="ml-5" src={require(`../Assets/${user.avatar}.png`)}/>
                        <div className="ml-2">
                            <h1 className="text-sm font-bold">{user.username}</h1>
                            {
                                online && <p className="text-xs text-green-500 mt">Online</p>
                            }
                        </div>
                    </header>
                    <div className="w-full h-full relative">
                        <div ref={chatEndRef} style={{height:'480px',overflow:'auto'}} className="w-full">
                            {
                                messages.map((item,index)=>{
                                    return(
                                        <div key={index} className={
                                            item.sender !== sessionStorage.getItem('user') ? 
                                            "clear-both w-auto text-sm bg-[#4D47C3] float-left p-3 my-2 ml-2 max-w-[500px] text-white rounded-ss rounded-e":
                                            "relative clear-both float-right mr-2 w-auto text-sm p-3 my-2 ml-2 bg-slate-200 max-w-[500px] rounded-s rounded-es px-5"
                                        } 
                                        >
                                            { item.message }
                                            {
                                                item.sender === sessionStorage.getItem('user') ? <BasicMenu 
                                                                                                        Messages={messages}  
                                                                                                        MessageFun={setMessages} 
                                                                                                        Index={index} 
                                                                                                        Edit={setEditing}
                                                                                                        EditText={setEditText}
                                                                                                        Id={setId}
                                                                                                /> 
                                                                                                :''
                                            }
                                        </div>
                                    )
                                })
                            }
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
                                    ref={inputRef}
                                />
                                <button><SendIcon className="text-[#4D47C3]"/></button>
                            </form>
                        </div>
                        {
                            showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} className="absolute top-[-500px] left-[10px]"/>
                        }
                    </div>
                </React.Fragment>
            }
            <React.Fragment>
                <Dialog
                    open={editing}
                    onClose={handleClose}
                    maxWidth={"sm"}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    PaperProps={{
                        component: 'form',
                        onSubmit: handleEditFormSubmit
                    }}
                >

                    <DialogTitle id="alert-dialog-title">
                        {"Edit Message"}
                    </DialogTitle>

                    <DialogContent className="w-[500px]">
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                name="message"
                                label="Edit Message"
                                type="text"
                                fullWidth
                                variant="standard"
                                autoComplete="off"
                                value={editText}
                                onChange={(e)=> setEditText(e.target.value)}
                            />
                            <button className="float-right mt-2 mr-2 text-blue-500" type="submit">EDIT</button>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        </div>
    )
};

export default ShowMessages;

{/* <div className="clear-both w-auto text-sm bg-[#4D47C3] p-3 my-2 ml-2 text-white max-w-[500px] rounded-ss rounded-e">
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
                            </div> */}