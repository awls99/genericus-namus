import React from 'react';
import { ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton } from '@mui/material';
import gallery from "../json/gallery.json";
import { Gallery } from '../models/gallery';

const images: Gallery = gallery;
function HallOfFame() {
  return (
    <ImageList id="hall-of-fame">
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Hall of Fame</ListSubheader>
      </ImageListItem>
      {images.images.map((item) => (
        <ImageListItem key={item.sort}>
          <img
            src={`${item.url}`}
            srcSet={`${item.url} 2x`}
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
  );
};

export default HallOfFame;