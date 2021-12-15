import { Box } from '@mui/material';
import React from 'react';


export default function ScrollTo(props: {anchorId: string, children: React.ReactElement}) {
  const { children, anchorId } = props;
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector(anchorId);

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
      <Box
        onClick={handleClick}
      >
        {children}
      </Box>
  );
}