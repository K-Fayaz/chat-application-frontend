import io from "socket.io-client";

let BASE_URL = 'http://localhost:4000';


const socket = io(BASE_URL,{
    autoConnect: false,
    auth:{
        userId: sessionStorage.getItem('user'),
    }
});

export default socket;