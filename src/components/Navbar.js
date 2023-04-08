import React,{useState} from "react";
import PetsIcon from '@mui/icons-material/Pets';
import {AppBar, Avatar, Box, InputBase, Toolbar, Typography, Menu,MenuItem} from "@mui/material"
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Mail,Notifications} from "@mui/icons-material";
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Badge from '@mui/material/Badge';
function Navbar(){
    const [menu,setmenu]=useState(false);
    const Search= styled("div")(({theme})=>({
        backgroundColor:"white",
        padding:"0 10px",
        borderRadius: theme.shape.borderRadius
        // borderRadius:theme.borderRadius
    }));
    const Icons= styled(Box)(({theme})=>({
        display:"flex",
        gap:"20px",
        alignItems:"center",
        // borderRadius:theme.borderRadius
    }));
    const User= styled(Box)(({theme})=>({
        display:"flex",
        gap:"10px",
        alignItems:"center",
        // borderRadius:theme.borderRadius
    }))
    return(
        <AppBar bgcolor="blue" position="sticky" flex={1} >
            <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
                <Typography variant="h6" sx={{display:{xs:"none", sm:"block"}}}> Navbar</Typography>  
            <PetsIcon sx={{display:{xs:"block", sm:"none"}}}/>
            <Search sx={{width:"40%"}} >
                <InputBase placeholder="Search..."/>
            </Search>
            <Icons sx={{display:{xs:"none", sm:"flex"}}}>
                <Badge badgeContent={7} color="error">
                    <Mail color="white" />
                </Badge>
                <Badge badgeContent={7} color="error">
                    <Notifications color="white" />
                </Badge>    
                <Avatar sx={{height:"40px", width:"40px"}} onClick={e=>{setmenu(true)}} src="https://render.fineartamerica.com/images/rendered/default/canvas-print/6.5/10/mirror/break/images/artworkimages/medium/3/empire-state-blue-night-inge-johnsson-canvas-print.jpg"/>
            </Icons>
            <User sx={{display:{xs:"flex", sm:"none"}}} onClick={e=>{setmenu(true)}}>
                <Avatar sx={{height:"40px", width:"40px"}} src="https://render.fineartamerica.com/images/rendered/default/canvas-print/6.5/10/mirror/break/images/artworkimages/medium/3/empire-state-blue-night-inge-johnsson-canvas-print.jpg"/>
                <Typography variant="h6">Raavan</Typography>
            </User>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                // anchorEl={anchorEl}
                open={menu}
                onClose={e=>{setmenu(false)}}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'rigth',
                }}
      >
                <MenuItem >Profile</MenuItem>
                <MenuItem >My account</MenuItem>
                <MenuItem >Logout</MenuItem>
            </Menu>
            </Toolbar>    
        </AppBar>
    )
}
export default Navbar;