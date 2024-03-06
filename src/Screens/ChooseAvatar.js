

const ChooseAvatar = ()=>{
    return(
        <>
            <div className="w-full h-screen grid place-items-center">
                <div className="w-3/4 bg-white h-5/6 rounded border shadow-2xl flex flex-wrap p-3 overflow-y-scroll">
                    <div className="bg-red-300 w-[150px] h-[150px] rounded-full">
                        <img src={require("../Assets/batman.png")} className="rounded-full"/>
                    </div>
                    <div className="bg-red-300 w-[150px] h-[150px] rounded-full">
                        <img src={require("../Assets/bear.png")} className="rounded-full"/>
                    </div>
                    <div className="bg-red-300 w-[150px] h-[150px] rounded-full">
                        <img src={require("../Assets/cat.png")} className="rounded-full"/>
                    </div>
                    <div className="bg-red-300 w-[150px] h-[150px] rounded-full">
                        <img src={require("../Assets/chewing-gum.png")} className="rounded-full"/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ChooseAvatar;

