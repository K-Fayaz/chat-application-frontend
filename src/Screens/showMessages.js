import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

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

    return(
        <div className="w-full h-full">
            <header className="w-full py-3 flex flex-row border-b">
                <Avatar className="ml-5" src={require(`../Assets/${seedData[id].image}`)}/>
                <div className="ml-2">
                    <h1 className="text-sm font-bold">{seedData[id].username}</h1>
                    <p className="text-xs text-green-500 mt">Online</p>
                </div>
            </header>
            <div className="w-full h-full relative">
                <div style={{height:'480px',overflow:'auto'}} className="w-full">
                    <p className="clear-both w-auto text-sm bg-[#4D47C3] p-3 my-2 ml-2 text-white max-w-[500px] rounded-ss rounded-e" >Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>
                    <p className="clear-both float-right mr-2 w-auto text-sm p-3 my-2 ml-2 bg-slate-200 max-w-[500px] rounded-s rounded-es" >Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>
                    <p className="clear-both w-auto text-sm bg-[#4D47C3] p-3 my-2 ml-2 text-white max-w-[500px] rounded-ss rounded-e" >Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>
                    <p className="clear-both float-right mr-2 w-auto text-sm p-3 my-2 ml-2 bg-slate-200 max-w-[500px] rounded-s rounded-es" >Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>
                    <p className="clear-both w-auto text-sm bg-[#4D47C3] p-3 my-2 ml-2 text-white max-w-[500px] rounded-ss rounded-e" >Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>
                    <p className="clear-both float-right mr-2 w-auto text-sm p-3 my-2 ml-2 bg-slate-200 max-w-[500px] rounded-s rounded-es" >Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>
                    <p className="clear-both w-auto text-sm bg-[#4D47C3] p-3 my-2 ml-2 text-white max-w-[500px] rounded-ss rounded-e" >Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>
                    <p className="clear-both float-right mr-2 w-auto text-sm p-3 my-2 ml-2 bg-slate-200 max-w-[500px] rounded-s rounded-es" >Have you already prepared finanacial statement for the last month ?I can't find it anywhere...</p>

                </div>
                <div className="w-full flex justify-around">
                    <TextField
                        className="w-11/12"
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={4}
                        placeholder="Type Message"
                        size="small"
                    />
                    <button><SendIcon className="text-[#4D47C3]"/></button>
                </div>
            </div>
        </div>
    )
};

export default ShowMessages;