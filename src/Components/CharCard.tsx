import React from 'react';
import Item from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { EnrichedCharacter, MediaType } from '../models/models';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Achievement } from '../models/achievements';
import { Tooltip } from '@mui/material';

function CharChard(character: EnrichedCharacter) {
  const mediaUrl = character.media?.find((asset) => { return asset.key === MediaType.INSET })?.value;
  return (
    <Item>
      <Card>
        <CardMedia
          component="img"
          image={mediaUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {character.name} {character.achievements[0] ? verified(character.achievements[0].achievement) : ""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Level {character.level} {character.playable_class?.name?.en_GB}
          </Typography>
        </CardContent>
      </Card>
    </Item>
  );
}

function verified(achievent: Achievement) {
  return <Tooltip title={achievent.name}><VerifiedIcon /></Tooltip>
}

export default CharChard;
