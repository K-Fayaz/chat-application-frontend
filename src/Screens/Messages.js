import NavBar from "../partials/Navbar"; 
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';

let seedData = [
    {
        image:'chewing-gum.png',
        username:'Oleg Shatrava',
        time:'11:45 pm',
        message:'Is the date of general meeting already known ?',
    },
    {
        image:'batman.png',
        username:'Regina Polyakova',
        time:'10:25 am',
        message:'Oh,there is such a bunch of email, I cant find yours among...'
    },
    {
        image:'bear.png',
        username:'Yakov Shubin',
        time:'09:45 am',
        message:'I came up with this idea after visiting an art exhibition...'
    },
    {
        image:'cat.png',
        username:'Gleb Tarasov',
        time:'01:18 pm',
        message:'Try to think over the chronology of the events again...'
    },
    {
        image:'man (1).png',
        username:'Alvert Konovolov',
        time:'Yesterday at 11:20 am',
        message:'Wow, I definetly like it , check your shcedule and ring me back!!',
    },
    
]

const Messages = ()=>{
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
                        <div>
                            <Avatar
                                className="mr-10"
                                src={require("../Assets/chewing-gum.png")}
                            ></Avatar>
                        </div>
                    </header>
                </section>
            </main>
        </>
    )
};


export default Messages;