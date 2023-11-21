import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function PopupsPage(props) {
  let display = "none";
  if (props.isPopup.isShow) {
    display = "flex";
  }
  console.log(props);
  return (
    <Box sx={{ 
      display: {display},
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'rgba(0,0,0,0.6)',
      position: 'fixed',
      zIndex: 1,
      width:'100%',
      height:'100vh',
      // backgroundColor: 'rgba(0,0,0,0.3)'
      }}>
      {/* <CircularProgress /> */}
      {/* <div style={{ width: 200, height: 200, backgroundColor: "white" }}></div> */}
      {props.isPopup.soakData}
    </Box>
  );
}