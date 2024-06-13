import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { BASE_URL } from "../constants";
import socket from "../Utils/socket";


const BasicMenu = ({ Messages , MessageFun , Index , Edit , EditText,Id })=>{
    
    const [anchorEl,setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e)=>{
        setAnchorEl(e.currentTarget);
    }

    const handleClose = ()=>{
        setAnchorEl(null);
    }

    const handleMessageDelete = async()=>{
        setAnchorEl(null);
        try{
            console.log("Before deleting :",Messages.length);
            let newMessages = Messages.filter((item,index)=> index !== Index);
            console.log("After deleting: ",newMessages.length);

            MessageFun(newMessages);
            
            let url = `${BASE_URL}/messages/delete/${Messages[Index]._id}`;
            axios({
                url,
                method:"DELETE",
                headers:{
                    token: sessionStorage.getItem('token'),
                }
            })
            .then((response)=>{
                // console.log("Message delete Response is :",response);
                if(response.data.status === true){

                    // Emit the message delete Event 
                    socket.emit("message-deleted",{ message: Messages[Index] } );
                }
            })
            .catch((err)=>{
                console.log("Error has occured: ",err);
            })

        }
        catch(err){

        }
    }

    const handleEditClick = ()=>{
        setAnchorEl(null);
        Edit(true);
        Id(Messages[Index]._id);
        EditText(Messages[Index].message);
    }

    return(
        <div className="absolute right-[-6px] top-[5px]">
                                <IconButton
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon style={{fontSize:'18px'}} />
                                    
                                </IconButton>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem className='text-sm' onClick={handleMessageDelete}>Delete</MenuItem>
                                        <MenuItem className='text-sm' onClick={handleEditClick}>Edit</MenuItem>
                                    </Menu>
                                </div>
    )
};

export default BasicMenu;