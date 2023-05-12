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
 const [filteredData, setFilteredData]=useState(mockData);
  const [currPage, setCurrPage] = useState(0);

  const genderList = [
    "Female",
    "Male",
    "Agender",
    "Bigender",
    "Polygender",
    "Non-binary",
    "Genderfluid",
    "Genderqueer",
  ];
  const availabilityList = [true, false];
  const domainList = [
    "Sales",
    "Finance",
    "Marketing",
    "IT",
    "Management",
    "UI Designing",
    "Business Development",
  ];
  // const [availability, setAvailability] = useState(Array(2).fill(false));
  // const [Gender, setGender] = useState(Array(8).fill(false));
  // const [domain, setDomain] = useState(Array(7).fill(false));

  const [pages, setPages] = useState(
    data.length % 20 !== 0 ? Math.ceil(data.length / 20) : data.length / 20
  );

  function displayCurrDetails() {
    setCurrdata(data.slice(currPage * 20, currPage * 20 + 20));
  }

  const updateSearchedData = (searchedName) => {
    setData(
      mockData.filter((c) => {
        return (
          c.first_name.toLocaleLowerCase().startsWith(searchedName) ||
          c.last_name.toLocaleLowerCase().startsWith(searchedName) ||
          (c.first_name + " " + c.last_name)
            .toLowerCase()
            .startsWith(searchedName)
        );
      })
    );
    
  };

  const viewAllData = () => {
    setData(mockData);
    
  };

  const prevPage = () => {
    setCurrPage(currPage - 1);
  };
  const nextPage = () => {
    setCurrPage(currPage + 1);
  };
  useEffect(() => {
    setPages(
      data.length % 20 !== 0 ? Math.ceil(data.length / 20) : data.length / 20
    );
    displayCurrDetails();
  }, [data, currPage]);

  useEffect(() => {
    setCurrPage(0);
  }, [data]);
  const updatePage = (i) => {
    setCurrPage(i);
  };

  // ======================filtering =====================

  const filterAvailable= (arr)=>{
    let array = arr;
    if(!arr.includes(true)){
      array = arr.map(()=>{
        return true
      })
    }
    setData(mockData.filter((c)=>{
      return  filter(array,availabilityList,c,"available");
    }))
    
  }

  const filterGender=(array)=>{
    // let array = arr;
    // if(!arr.includes(true)){
    //   array = arr.map(()=>{
    //     return true
    //   })
    // }
    
   
    setData(data.filter((c)=>{
      return  filter(array,genderList,c,"gender");
    }))
  }
  const filterDomain=(arr)=>{
    let array = arr;
    if(!arr.includes(true)){
      array = arr.map(()=>{
        return true
      })
    }
    setData(data.filter((c)=>{
      return  filter(array,domainList,c,"domain");
    }))
    // setData(filteredData)
    console.log(data)
  }



  const filter = (arrTF,arrItems,c,prop)=>{
    var result = false;
    
    for (let i = 0; i < arrTF.length; i++) {
      
    
      if(arrTF[i]?c[prop]===arrItems[i]:false){
        
        result = true;
        break
      }
      
    }
  
    return result;
  }
  return (
    <div className="App">
      <Navbar
        updateSearchedData={updateSearchedData}
        genderList={genderList}
        domainList={domainList}
        availabilityList={availabilityList}
        filterAvailable={filterAvailable}
        filterGender = {filterGender}
        filterDomain={filterDomain}
      />
      {mockData.length!==data.length? (
        <div className="view-all-holder">
          <button onClick={viewAllData}>View all</button>
        </div>
      ) : (
        ""
      )}
      {currData.map((currUser) => {
        return <Card currUser={currUser} key={currUser.id} />;
      })}
      {data.length ? "" : "no profile found"}

      <div className="page-locator">
        <PaginationBar
          pages={pages}
          currPage={currPage}
          updatePage={updatePage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
}

export default App;
