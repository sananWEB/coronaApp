import React,{useEffect,useState,useContext} from 'react';
import Main2 from "./main2"
import {Context} from "../App"
import ButtonAppBar from "./Navbar2"
import {Grid,Box,Paper,Container,Typography, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios"
import FooterPage from "./footer"
import { faPills,faDisease,faVirusSlash,faProceduresfaViruses,faViruses,faHeadSideMask,faStethoscope,faVirus,faHospitalUser,faShieldVirus,faClinicMedical,faProcedures } from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter,Route,Link,useHistory,useRouteMatch} from "react-router-dom"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



function Accept() {
const {user,setuser}=useContext(Context)

const [open, setopen] = useState(false)

const [msg, setmsg] = useState("")
    const history=useHistory();

    if(localStorage.getItem("Ltoken")==""){
        history.push("/")
    }

const [data, setdata] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:5000/useracceptrequestview").then((res)=>{
        setdata(res.data)
            })
    },[])


 

    //console.log(newarry)

    const dellete= async(e)=>{
//console.log(e)
  await axios.post("http://localhost:5000/deleteuserrequest",{id:e}).then((res)=>{
setmsg(res.data.msg)
setopen(true);
})

await axios.get("http://localhost:5000/useracceptrequestview").then((res)=>{
        setdata(res.data)
            })
    }


    const newarry=data.filter((i)=>{
        return i.useremail==user.email
        })

        const handleClick = () => {
            setopen(false);
          };
    
    return (
        <>
<ButtonAppBar/>
     <Main2 image="pakistan1.jpg" text="Accepted Requests" />
     <br/>
     <Container style={{minHeight:"60vh"}}>
         {newarry.length==0?

         <Paper style={{padding:"20px"}}>
        <Typography variant="body1" align="center">No Request has been Accepted</Typography>
         </Paper>:
     <Grid container spacing={2 }>

         {newarry.map((i)=>
         
         <Grid item xs={12} sm={6} md={4}>
             <Paper style={{padding:"10px"}}>
                 
         <Typography variant="h5"><b>{i.name}</b></Typography><br/>
                 <Typography variant="body2" component="p"><b>Email:</b>{i.donoremail}</Typography>
                 <Typography variant="body2" component="p"><b>Phone:</b>{i.number}</Typography>
                 <Typography variant="body2" component="p"><b>Address:</b>{i.address}</Typography>
                 <Typography variant="body2" component="p"><b>Message:</b>{i.massage}</Typography>
                 <br/>
                 <div style={{display:"flex",justifyContent:"flex-end"}}>
                 <Button onClick={()=>dellete(i._id)} style={{backgroundColor:"red",color:"white"}}>Delete</Button>
                 </div>
                
             </Paper>
         </Grid>
     
         )}
      
   
         </Grid>   
            }
         </Container>    


         <Snackbar open={open} autoHideDuration={3000} onClose={handleClick} >
      <MuiAlert  severity="error" elevation={6} variant="filled">
    {msg}
    </MuiAlert>


</Snackbar>     
<br/> 
<FooterPage/>
        </>
    )
}

export default Accept
