import React from 'react';
import { ImageList, ImageListItem, ListSubheader, ImageListItemBar, Paper, Typography } from '@mui/material';
import gallery from "../json/gallery.json";
import { Gallery } from '../models/gallery';

const images: Gallery = gallery;
function HallOfFame() {
  return (
    <Paper sx={{
      marginTop: "8px",
      marginBottom: "8px",
      padding: "8px"
    }} id="hall-of-fame">
      <Typography variant="h6" color="inherit" component="div">Hall of Fame</Typography>
      <ImageList cols={4}>
        {images.images.map((item) => (
          <ImageListItem key={item.sort}>
            <img
              src={`${item.url}`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.desc}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Paper>
  );
};

export default HallOfFame;