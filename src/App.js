import { useEffect, useState } from "react";
import mockData from "./heliverse_mock_data.json";
import Card from "./components/Card.js";
import "./components/card.css";
import Navbar from "./components/Navbar"


function App() {
const [data,setData] = useState(mockData);
const [count, setCount]= useState(Array(20).fill(0).map((e,i)=>{
  return i;
}))
const changeToUser = (searchedName)=>{

  setData(mockData.filter((c)=>{
    return(searchedName.toLowerCase()
    ===(c.first_name+" "+c.last_name).toLocaleLowerCase())
  }))
  console.log(data)
  if(data){
  setCount([data.length])}
  else{
    setCount([0])
  }
}
console.log(count)
  return (
    <div className="App" >
      <Navbar changeToUser= {changeToUser}/>
     {count? <Card count = {count} data = {data}/>:"no user"}
    </div>
  );
}

export default App;
