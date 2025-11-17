import React from 'react'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from 'react-router';

const Header = () => {
  return (
    <div> <Box sx={{ flexGrow: 1 }}>
        <AppBar className='bg-danger' position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography className="fw-bold p-4 " variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Job Seeker
            </Typography>
          </Toolbar>
        </AppBar>
      </Box></div>
  )
}

export default Header