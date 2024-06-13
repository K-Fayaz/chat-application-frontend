
import { useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import { Button } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";

let avatars = [
    {
        img:'superhero.png',
        alt:'I am Ironman!'
    },
    {
        img: 'bear.png',
        alt:'Bear',
        title:'Cuddle Bear'
    },
    {
        img:'cat.png',
        alt:'Cat',
        title:"Snow cat"
    },
    {
        img: 'chewing-gum.png',
        alt:'Chewing gum',
        title:'Cool Dude'
    },
    {
        img: 'gamer.png',
        alt:'Gamer',
        title:"Gamer Boy"
    },
    {
        img:'man (1).png',
        alt: 'Man Image 1',
        title:"I am Nerd"
    },
    {
        img:'man.png',
        alt:'Man Image',
    },
    {
        img:'penguin.png',
        alt:'Penguin Image'
    },
    {
        img:'rabbit.png',
        alt:'Rabbit',
    },
    {
        img:'spiderman.png',
        alt:'Spiderman'
    },
    {
        img: 'batman.png',
        alt:'batman',
        title:"I'm Vengence"
    },
    {
        img:'woman (1).png',
        alt:'Woman 1',
    },
    {
        img:'woman (2).png',
        alt:'Woman 2'
    },
    {
        img:'woman (3).png',
        alt:'woman 3'
    },
    {
        img:'woman (4).png',
        alt:'Woman 4'
    },
    {
        img:'woman.png',
        alt:'woman'
    }
]

const ChooseAvatar = ()=>{

    const navigate = useNavigate();
    const [currentIndex,setCurrentIndex] = useState(null);

    const handleAvatarClick = (index)=>{
        currentIndex !== index ? setCurrentIndex(index) : setCurrentIndex(null);
    }

    const handleAvatarSelect = async()=>{
        console.log("Selected Avatar is",avatars[currentIndex].img.split(".")[0]);

        let payload = {
            avatar: avatars[currentIndex].img.split(".")[0]
        };

        let url = 'http://localhost:8080/api/user/avatar';

        try{
            let response = await axios({
                method:"POST",
                url,
                data: payload,
                headers:{
                    'Content-Type':'application/json',
                },
                withCredentials: true,
            });

            console.log(response.data);
            if(response.data.status === true){
                sessionStorage.setItem("avatar",response.data.content.avatar);
            }
            navigate("/");
        }   
        catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <div className="w-full h-screen grid place-items-center">
                <div className="w-3/4 bg-white h-5/6 rounded border shadow-2xl flex flex-wrap p-5 overflow-y-scroll">
                    {
                        avatars.map((item,index)=>{
                            return(
                                <div 
                                 key={index} 
                                 className="relative w-[110px] cursor-pointer h-[110px] flex flex-row justify-center items-center rounded-full mx-10 my-5"
                                 onClick={()=>handleAvatarClick(index)}
                                 >
                                    <img style={{width:'100px',height:'100px',objectFit:'contain'}}  src={require(`../Assets/${item.img}`)} alt={item.alt} className="rounded-full bg-white"/>
                                    
                                    {
                                        currentIndex === index && <div className='absolute bg-green-200/[.5] w-[110px] h-[110px] rounded-full grid place-items-center'>
                                                                    <DoneIcon style={{color: 'green',width: '50px',height: '50px'}} />
                                                                  </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <Button 
                    disabled={currentIndex === null} 
                    style={{marginBottom:'10px'}} 
                    variant="contained"
                    onClick={handleAvatarSelect}
                >
                    Continue
                </Button>
            </div>
        </>
    )
};

export default ChooseAvatar;

