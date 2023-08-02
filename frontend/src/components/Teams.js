import React , { useState} from 'react';
import Card from "./Card";
import { useNavigate } from 'react-router-dom';
import "../app.css"


const Teams = () => {
  const history = useNavigate();
const teamList = []
for(let i = 0; i<localStorage.length;i++){
    teamList.push(localStorage.key(i))
}


const [currUser, setCurrUser] = useState()
const viewTeam = (c)=>{

setCurrUser(c)

}


   

  return (
    <div>
<div><button onClick={()=>{
history("/accounts")
}} className='viewteams-btn cancel-btn'>Back</button></div>

{teamList.map((c,i)=>{
   return( <div key={i}><button className = "team-list"onClick={()=>{
            viewTeam(JSON.parse(localStorage.getItem(c))["array"])
   }}>{c}</button></div>)


  

})} 


      
{currUser? currUser.map((c,i)=>{
  
  return(<><Card currUser={JSON.parse(c)} key={i}/></>)
}):''}
    </div>
  )
}

export default Teams
