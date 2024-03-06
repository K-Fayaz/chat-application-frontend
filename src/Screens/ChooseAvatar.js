
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
    return(
        <>
            <div className="w-full h-screen grid place-items-center">
                <div className="w-3/4 bg-white h-5/6 rounded border shadow-2xl flex flex-wrap p-5 overflow-y-scroll">
                    {
                        avatars.map((item,index)=>{
                            return(
                                <div key={index} className="w-[110px] cursor-pointer h-[110px] flex flex-row justify-center items-center rounded-full mx-10 my-5">
                                    <img style={{width:'100px',height:'100px',objectFit:'contain'}}  src={require(`../Assets/${item.img}`)} alt={item.alt} className="rounded-full bg-white"/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
};

export default ChooseAvatar;

