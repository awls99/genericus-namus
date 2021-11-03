import React from 'react';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';


function About() {
  return (
    <Paper>
      <Typography variant="h6" color="inherit" component="div" id="about-text">
        About Generics Namus
      </Typography>
      <Typography variant="body1">
        Founded in March 2018, <b>Genericus Namus</b> is a horde guild located on the Magtheridon realm.
      </Typography>
      <Typography variant="body1">
        With membership numbers exceeding 100 members and with an
        overall focus on the social aspect of the game, it truly is the
        feeling community which is the foundation of the guild. While
        raiding undeniably plays an important role within the guild, it
        is the guild ethos of nurturing the social aspect of the game
        that ensures that the guild is hale and hearty.
      </Typography>
      <Typography variant="body1">
        Among its accomplishments, <b>Genericus Namus</b> can boast all Ahead Of The Curve achivements
        since the release of Battle For Azeroth, a few mythic boss kills and most Glory runs as well. 
        All of these while mantaining a fun and welcoming environment.
      </Typography>
    </Paper>
  );
};

export default About;