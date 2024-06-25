
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link , useNavigate} from "react-router-dom";
import AnimationWrapper from "../partials/AnimationWrapper";
import axios from "axios";
import { BASE_URL } from '../constants';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Login = ()=>{

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [errors,setErrors] = useState([]);

    const handleLoginSubmit = async(e)=>{
        e.preventDefault();
        let formData = new FormData(e.target);

        let formDataObject = {};
        for(let [key,value] of formData.entries()){
            formDataObject[key] = value;
        }

        console.log("Form Data object is ",formDataObject);


        try{
            let url = `${BASE_URL}/user/auth/login`;
            let response = await axios({
                method:"POST",
                url,
                data: formDataObject,
                headers:{
                    'Content-Type':'application/json',
                },
                // withCredentials: true            
            });
            
            console.log(response.data.content);
            sessionStorage.setItem('user',response.data.content.data.id);
            sessionStorage.setItem("avatar",response.data.content.data.avatar);
            sessionStorage.setItem('token',response.data.content.meta.access_token);
            // navigate("/");
            window.location.href = '/';
        }
        catch(err){
            console.log(err);

            if(err.response.data.status === false){
                setOpen(true);

                setTimeout(()=>{
                    setOpen(false);
                    setErrors([]);
                },[6000])

                setErrors(err.response.data.errors);
            }

        }

    }

    const handleClick = ()=>{
        setOpen(true);
    }

    const handleClose = ()=>{
        setOpen(false);
    }

    return(
        <>
                <div className="w-1/2 h-full grid place-items-center">
                    <AnimationWrapper className="w-full">
                        <div className='w-[400px]'>
                            <h1 className='text-3xl text-[#4D47C3] font-bold mb-5'>Login</h1>
                            <form onSubmit={handleLoginSubmit}>
                                <div className='mb-3'>
                                    <TextField className='w-full' type='email' name='email' label="Email" variant="outlined" />
                                </div>
                                <div className='mb-3'>
                                    <TextField className='w-full'  type='password' name="password" label="Password" variant="outlined" />
                                </div>
                                <Button type='submit' className='w-full' variant='contained'>Sign In</Button>
                            </form>
                            <p className='mt-5'>Don't have an account ? <Link style={{color: '#4D47C3'}} to='/auth/register'>Register here!</Link> </p>

                            <div className=''>
                                {
                                    errors.map((item,index)=>(
                                        <Snackbar key={index} open={open} autoHideDuration={6000}>
                                            <Alert
                                                // onClose={handleClose}
                                                severity="error"
                                                variant="filled"
                                                sx={{ width: '100%' }}
                                            >
                                                { item.message }
                                            </Alert>
                                        </Snackbar>
                                    ))
                                }
                            </div>

                        </div>
                    </AnimationWrapper>
                </div>
        </>
    )
};

export default Login;