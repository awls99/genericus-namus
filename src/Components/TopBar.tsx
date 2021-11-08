import React from 'react';
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar/Avatar";
import ScrollTo from './helpers/ScrollTo';
import { Button } from '@mui/material';


function TopBar() {
  return (
    <AppBar position="sticky">
      <Toolbar >
        <Avatar alt="Genericus Namus Crest" src="https://render-eu.worldofwarcraft.com/guild/tabards/emblem_181.png" />
        <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
          Generics Namus
        </Typography>
        <ScrollTo anchorId="#about-text">
          <Button color="inherit">About</Button>
        </ScrollTo>
        <ScrollTo anchorId="#hall-of-fame">
          <Button color="inherit">Hall of Fame</Button>
        </ScrollTo>
        <ScrollTo anchorId="#mplus">
          <Button color="inherit">Mythic Plus Activity</Button>
        </ScrollTo>
        <ScrollTo anchorId="#roster">
          <Button color="inherit">Roster</Button>
        </ScrollTo>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;