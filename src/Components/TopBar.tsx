import React from 'react';
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar/Avatar";


function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
      <Avatar alt="Genericus Namus Crest" src="https://render-eu.worldofwarcraft.com/guild/tabards/emblem_181.png" />
        <Typography variant="h6" color="inherit" component="div">
          Generics Namus
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;