import io from "socket.io-client";

// let BASE_URL = 'http://localhost:8080';
const BASE_URL = "https://chat-api-101.onrender.com";


const socket = io(BASE_URL,{
    autoConnect: false,
    auth:{
        userId: sessionStorage.getItem('user'),
    }
});

export default socket;