import React,{useContext,useEffect,useState} from 'react'
import Main2 from "./main2"
import {Context} from "../App"
import ButtonAppBar from "./Navbar2"
import { makeStyles } from '@material-ui/core/styles';

import {Container,Paper,Typography,TextField,TableRow,TableCell,Table,TableHead,FormControlLabel,Checkbox,Grid,Card,CardActions,CardContent,TableBody,Button} from '@material-ui/core';
import {BrowserRouter,Route,Link,useHistory} from "react-router-dom"
import axios from "axios"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FooterPage from "./footer"


  
  function Requesttable() {
const [state, setstate] = useState([])
const {user,setuser}=useContext(Context)
  const [msg, setmsg] = useState("")
  const [open, setopen] = useState(false)
    useEffect(()=>{

      axios.get("http://localhost:5000/getrequest").then((res)=>{setstate(res.data);//console.log(res.data)
    })
    },[])

    const aaccept= async(e)=>{
              // console.log(e)

       await axios.post("http://localhost:5000/useracceptrequest",{id:e,email:user.email}).then(res=>{setmsg(res.data.msg);
       setopen(true);
      })

       await axios.get("http://localhost:5000/getrequest").then((res)=>{setstate(res.data);console.log(res.data)})
    }

    const handleClick = () => {
      setopen(false);
    };
    
    return (
        <>
       <ButtonAppBar/>
       <Main2 image="bloodtable.jpg" text="Request cards" />

       <Container maxWidth="lg">
        <Typography component="div" style={{ backgroundColor: 'transparent', minHeight: '100vh' }}>
          <br/>
{state.length==0?
         <Paper style={{padding:"20px"}}>
        <Typography variant="body1" align="center">No Request for plasma</Typography>
         </Paper>:
          <Grid container spacing={2}>
       {state.map((i)=>

<Grid item xs={12} sm={6} md={4} lg={3}>
              
              <Card>
        <CardContent>
          <Typography variant="h5"  gutterBottom>
       {i.name}
          </Typography>
  
       <Typography variant="body2" component="p"><b>PHONE: </b>{i.number}</Typography>
       <Typography variant="body2" component="p"><b>EMAIL: </b>{i.email}</Typography>
       <Typography variant="body2" component="p"><b>ADDRESS: </b>{i.address}</Typography>
          <Typography variant="body2" component="p">
          <b>MASSAGE: </b>
          {i.massage} 

          </Typography>
        </CardContent>
        <CardActions style={{display:"flex",justifyContent:"flex-end"}}>
        { user.login==false?null:
          <Button onClick={()=>aaccept(i._id)} variant="contained" style={{backgroundColor:"green",color:"white"}} size="small" >Accept</Button>
        }
        </CardActions>
      </Card>
  
              </Grid>
      )}
            
          </Grid>
        }
        </Typography>
      </Container>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClick} >
      <MuiAlert  severity="success" elevation={6} variant="filled">
    {msg}
    </MuiAlert>


</Snackbar>
<br/>
        <FooterPage/>
        </>
    )
}

export default Requesttable
