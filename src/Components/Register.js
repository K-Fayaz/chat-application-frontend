
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link , useNavigate } from "react-router-dom";
import AnimationWrapper from "../partials/AnimationWrapper";
import axios from "axios";
import { BASE_URL } from '../constants';

const Register = ()=>{

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        let formData = new FormData(e.target);
        
        let bodyObject = {};
        for(let [key,value] of formData.entries()){
            bodyObject[key] = value;
        }

        console.log(bodyObject);

        let url = `${BASE_URL}/user/auth/signup`;

        try{
            let response = await axios({
                method:"POST",
                url,
                data: bodyObject,
                headers:{
                    'Content-Type':'application/json',
                },
                withCredentials: true            
            });
            
            console.log(response.data.content);
            sessionStorage.setItem('user',response.data.content.data.id);
            sessionStorage.setItem('token',response.data.content.meta.access_token);
            navigate("/avatar");
        }
        catch(err){
            console.log(err.response.message);
        }
    }

    return(
        <>
            <div className="w-1/2 h-full grid place-items-center">
                <AnimationWrapper className="w-full">
                    <div className='w-[400px]'>
                        <h1 className='text-3xl text-[#4D47C3] font-bold mb-5'>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <TextField className='w-full' name='username' type='text' label="Username" variant="outlined" />
                            </div>
                            <div className='mb-3'>
                                <TextField className='w-full' name='email' type='email' label="Email" variant="outlined" />
                            </div>
                            <div className='mb-3'>
                                <TextField className='w-full' name='password'  type='password' label="Password" variant="outlined" />
                            </div>
                            <Button type='submit' className='w-full' variant='contained'>Sign Up</Button>
                        </form>
                        <p className='mt-5'>Already have an account ? <Link style={{color: '#4D47C3'}} to='/auth/login'>Login here!</Link> </p>
                    </div>
                </AnimationWrapper>
            </div>
        </>
    )
};

export default Register;