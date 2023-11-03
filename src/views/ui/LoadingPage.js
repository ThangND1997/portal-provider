import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingPage(props) {
  let display = "none";
  if (props.isLoad) {
    display = "flex";
  }
  return (
    <Box sx={{ 
      display: {display},
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'rgba(0,0,0,0.6)',
      position: 'absolute',
      zIndex: 1,
      width:'100%',
      height:'100%',
      // backgroundColor: 'rgba(0,0,0,0.3)'
      }}>
      <CircularProgress />
    </Box>
  );
}