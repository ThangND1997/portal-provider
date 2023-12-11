import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Counter from '../../components/dashboard/Counter';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));


export default function Cart(pops) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("releaseProducts"));
    setData(data);
  }, [])

  const deleteAllFunc = () => {
    localStorage.removeItem("releaseProducts");
    pops.data.childDataFunc({cartCount: 0})
    setData([])
  }
  const deleteItemFunc = (id) => {
    const data = JSON.parse(localStorage.getItem("releaseProducts"));
    const newData = data.filter(item => item.id != id);
    localStorage.setItem("releaseProducts", JSON.stringify(newData));
    pops.data.childDataFunc({cartCount: newData.reduce((a, b) => a + b.numberOfProducts, 0)})
    setData(newData)
  }
  const paymentFunc = () => {
    alert("coming soon....")
  }
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }} style={{ display: "flex", justifyContent: "center", margin: 10 }}>
        <Grid container spacing={2} style={{ display: "flex", justifyContent: 'center' }}>
          <Demo style={{ borderRadius: 16 }}>
            <List>
              {data ? data.map((item, index) => 
                  <ListItem>
                      <ListItemAvatar style={{ }}>
                          <img src={item.image} style={{ width: 70, height: 40, borderRadius: "14px", objectFit: "cover" }} />
                      </ListItemAvatar>
                      <ListItemText
                          style={{ marginLeft: 16 }}
                          primary={item.title}
                      />
                      <Counter cart={item.numberOfProducts}/>
                      <IconButton edge="end" aria-label="delete" width="10%" onClick={() => deleteItemFunc(item.id)}>
                          <DeleteIcon color="error"/>
                      </IconButton>
                  </ListItem>
              ) : <></>}
              </List>
              {data && data.length ? 
              <>
              <Button style={{float: "right", margin: 20, marginRight: 36 }} className="mt-2" color="primary" onClick={paymentFunc}>Thanh Toán</Button>
              <Button color="warning" style={{float: "right" }} className="mt-2" onClick={deleteAllFunc}>Làm mới</Button>
              </>  : <></>
            }
              
          </Demo>
        </Grid>
    </Box>
  );
}