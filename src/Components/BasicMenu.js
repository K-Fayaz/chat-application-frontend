

import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const BasicMenu = ()=>{
    
    const [anchorEl,setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e)=>{
        setAnchorEl(e.currentTarget);
    }

    const handleClose = ()=>{
        setAnchorEl(null);
    }

    return(
        <div className="absolute right-0 top-[5px]">
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
                                        <MenuItem className='text-sm' onClick={handleClose}>Delete</MenuItem>
                                        <MenuItem className='text-sm' onClick={handleClose}>Edit</MenuItem>
                                    </Menu>
                                </div>
    )
};

export default BasicMenu;