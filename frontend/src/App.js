


import "./components/card.css";

import "./app.css";

import {Routes, Route} from "react-router-dom";
import Teams from "./components/Teams";

import Auth from "./components/authComp/Auth";
import Dashboard from "./components/authComp/Dashboard";
import Body from "./components/authComp/Body";

function App() {
 
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Auth/>}/>
        <Route exact path="/accounts" element = 
      {<>
           <Body/>
      </>}/>

      <Route exact path="/accounts/teams" element={<Teams/>}/>
      <Route exact path="/accounts/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
