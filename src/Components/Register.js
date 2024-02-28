
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@emotion/react';
import myTheme from '../myTheme';
import { Button } from '@mui/material';
import {Link} from "react-router-dom"
import AnimationWrapper from "../partials/AnimationWrapper";

const Register = ()=>{
    return(
        <>
            <div className="w-1/2 h-full grid place-items-center">
                <AnimationWrapper className="w-full">
                    <div className='w-[400px]'>
                        <h1 className='text-3xl text-[#4D47C3] font-bold mb-5'>Register</h1>
                        <form>
                            <div className='mb-3'>
                                <TextField className='w-full' type='text' label="Username" variant="outlined" />
                            </div>
                            <div className='mb-3'>
                                <TextField className='w-full' type='email' label="Email" variant="outlined" />
                            </div>
                            <div className='mb-3'>
                                <TextField className='w-full'  type='password' label="Password" variant="outlined" />
                            </div>
                            <Button type='submit' disabled className='w-full' variant='contained'>Sign Up</Button>
                        </form>
                        <p className='mt-5'>Already have an account ? <Link style={{color: '#4D47C3'}} to='/auth/login'>Login here!</Link> </p>
                    </div>
                </AnimationWrapper>
            </div>
        </>
    )
};

export default Register;