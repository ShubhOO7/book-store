import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";


const About = () => {
    const navigate = useNavigate();
    const handleClick = e => {
        // logout(false);
        navigate('/');
    }
    return (

        <div>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography sx={{ fontFamily: "fantasy", marginTop: "10%" }} variant="h2">
                    This is a Book Store App
                </Typography>
                <Typography sx={{ fontFamily: "fantasy" }} variant="h3">
                    By MERN STACK
                </Typography>
                <Button variant="outlined" color="error" style={{ width: "40%", margin: "10%" }} onClick={handleClick}>
                    Logout
                </Button>

                <Typography sx={{ fontFamily: "fantasy" }} variant="h3">
                    HandCrafted by Shubham Kanojia
                </Typography>
            </Box>
        </div>
    );
};

export default About;