import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Typography, Tabs, Tab, Toolbar } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

function Header() {
    const [value, setValue] = useState(1);
    function handleClick(e, val) {
        // console.log(val);
        setValue(val);
    }
    const navigate = useNavigate();
    return (
        <div>
            <AppBar position="sticky" sx={{ backgroundColor: '#232F3D' }}>
                <Toolbar>
                    <Typography >
                        <LibraryBooksIcon onClick={() => navigate('/books')} />
                    </Typography>
                    <Tabs
                        sx={{ ml: "auto" }}
                        textColor="inherit"
                        indicatorColor="primary"
                        value={value}
                        onChange={handleClick}
                    >
                        <Tab LinkComponent={NavLink} to="/add" label="Add product" />
                        <Tab LinkComponent={NavLink} to="/Search" label="Find" />
                        <Tab LinkComponent={NavLink} to="/books" label="Books" />
                        <Tab LinkComponent={NavLink} to="/about" label="About Us" />
                    </Tabs>
                </Toolbar>
            </AppBar>
        </div >
    )
}

export default Header