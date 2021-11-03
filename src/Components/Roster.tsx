import React from 'react';
import roster from "../json/roster.json";
import Grid from "@mui/material/Grid/Grid";
import CharChard from './CharCard';
import { EnrichedCharacter } from '../models/models';
function Roster() {
  const filteredRoster: EnrichedCharacter[] = roster
  .filter((char) => { return char.level === 60 })
  .sort((char1, char2)=>{
    return char1.rank - char2.rank;
  });
  return (
    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {filteredRoster.map((char, index) => {
        return (
          <Grid item xs={2} sm={4} md={4} key={index}>
            {CharChard(char)}
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Roster;
