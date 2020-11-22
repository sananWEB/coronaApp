import React,{useEffect,useState} from 'react';
import Main2 from "./main2"
import ButtonAppBar from "./Navbar2"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import {Grid,Box,Paper,Button,Container,Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios"
import FooterPage from "./footer"


const useStyles = makeStyles({
    root: {
      maxWidth: 345,

    },
    media: {
      height: 200,
    },
  });
function Lockdown() {
    const classes = useStyles();
         const [carddata, setcarddata] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:5000/getdata").then((res)=>{
            setcarddata(res.data)
        })
    },[])
console.log(carddata)
    return (
        <>
                   <ButtonAppBar/>
                   <Main2 image="peshawar.jpg" text="LOCKDOWN AREAs IN PESHAWAR" />
                   <br/>
                   <Container>
               <Grid container spacing={2}>

                   {carddata.map((i)=>

<Grid item xs={6} sm={6} md={3}>
<Card >
<CardActionArea>
<CardMedia
className={classes.media}
image={process.env.PUBLIC_URL+`/city/${i.bgimg}`}
title={i.name}
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
                   {i.name}
</Typography>

<Typography variant="h6" style={{color:i.lockdown=="Safe"?"#26ae60":"#B83227"}} component="p">

 {i.lockdown}
</Typography>

</CardContent>
</CardActionArea>

</Card>
</Grid>


                   )}
                   
               </Grid>
                   </Container>
                   <br/>
        <FooterPage/>
        </>
    )
}

export default Lockdown
