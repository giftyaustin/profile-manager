import { useEffect, useState } from "react";
import mockData from "./heliverse_mock_data.json";
import Card from "./components/Card.js";
import "./components/card.css";
import Navbar from "./components/Navbar";
import "./app.css";
import PaginationBar from "./components/PaginationBar";

function App() {
 
  const [data, setData] = useState(mockData);
  const [currData, setCurrdata] = useState(data);
  const [dataFiltered,setDataFiltered]= useState(false);
  const [currPage, setCurrPage] = useState(0);
  const [pages, setPages] = useState(
    data.length % 20 !== 0 ? Math.ceil(data.length / 20) : data.length / 20
  );

  function displayCurrDetails() {
    if (currPage === pages) {
      setCurrdata(data.slice(currPage * 20, -1));
    } else {
      setCurrdata(data.slice(currPage * 20, currPage * 20 + 20));
    }
  }
  const updateSearchedData=(searchedName)=>{
    setData(mockData.filter((c)=>{
      
      
        return (c.first_name.toLocaleLowerCase().startsWith(searchedName)||
        c.last_name.toLocaleLowerCase().startsWith(searchedName)||
        (c.first_name+ " "+c.last_name).toLowerCase().startsWith(searchedName))
    }))
    setDataFiltered(true)
  }


  const viewAllData=()=>{
    setData(mockData)
    setDataFiltered(false)
  }
  useEffect(() => {
    displayCurrDetails();
  }, [data]);

  return (
    <div className="App">
      <Navbar updateSearchedData={updateSearchedData}/>
      {dataFiltered?<div className="view-all-holder"><button onClick={viewAllData}>View all</button></div>:""}
      {currData.map((currUser) => {
        return (<Card currUser={currUser} key={currUser.id} />)
      })}
      {data.length?"":"no profile found"}
    
    
    <PaginationBar/>
    
    </div>
  );
}

export default App;
