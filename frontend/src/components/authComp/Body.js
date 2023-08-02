import React from "react";
import { useEffect, useState } from "react";
import Card from "../Card";
import Navbar from "../Navbar";
import PaginationBar from "../PaginationBar";
import mockData from "../../heliverse_mock_data.json";
import { useNavigate } from "react-router-dom";
import { sendGETRequest } from "../../utils/sendRequest";

const Body = () => {
  const [data, setData] = useState(mockData);
  const [currData, setCurrdata] = useState(data);
  const [fdata, setFdata] = useState(mockData);
  const [currPage, setCurrPage] = useState(0);
  const [createTeam, setCreateTeam] = useState(false);
  const [teamName, setTeamName] = useState("");
  const history = useNavigate();
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

  // ====
  const getUser = async () => {
    localStorage.clear();
    const response = await sendGETRequest("/api/auth/user");
    if (response.success) {
      console.log(response.user);
      sessionStorage.setItem("user", JSON.stringify(response.user));
    } else {
      alert("no user");
      history("/");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  //   ===

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

  //  filtering available

  const filterAvailable = (Aarray, Garray, Darray) => {
    let Aarr = Aarray;
    let Garr = Garray;
    let Darr = Darray;
    if (!Aarray.includes(true)) {
      Aarr = Aarray.map(() => {
        return true;
      });
    }
    if (!Garray.includes(true)) {
      Garr = Garray.map(() => {
        return true;
      });
    }
    if (!Darray.includes(true)) {
      Darr = Darray.map(() => {
        return true;
      });
    }
    setFdata(
      mockData.filter((c) => {
        return filter(
          Aarr,
          availabilityList,
          c,
          "available",
          Garr,
          genderList,
          "gender",
          Darr,
          domainList,
          "domain"
        );
      })
    );
  };

  //  filtering gender

  const filterGender = (arr) => {
    let array = arr;
    if (!arr.includes(true)) {
      array = arr.map(() => {
        return true;
      });
    }

    setFdata(
      mockData.filter((c) => {
        return filter(array, genderList, c, "gender");
      })
    );
  };

  //  filtering domain

  const filterDomain = (arr) => {
    let array = arr;
    if (!arr.includes(true)) {
      array = arr.map(() => {
        return true;
      });
    }
    setFdata(
      fdata.filter((c) => {
        return filter(array, domainList, c, "domain");
      })
    );
  };
  useEffect(() => {
    setData(fdata);
  }, [fdata]);

  const filter = (
    AarrTF,
    AarrItems,
    c,
    Aprop,
    GarrTF,
    GarrItems,
    Gprop,
    DarrTF,
    DarrItems,
    Dprop
  ) => {
    var result = false;

    for (let i = 0; i < AarrTF.length; i++) {
      if (AarrTF[i] ? c[Aprop] === AarrItems[i] : false) {
        for (let j = 0; j < GarrTF.length; j++) {
          if (GarrTF[j] ? c[Gprop] === GarrItems[j] : false) {
            for (let k = 0; k < DarrTF.length; k++) {
              if (DarrTF[k] ? c[Dprop] === DarrItems[k] : false) {
                result = true;
                break;
              }
            }
          }
        }
      }
    }

    return result;
  };
  const teamCreation = () => {
    if (teamName !== "") {
      if (localStorage.getItem(teamName)) {
        alert("team name already exists");
      } else {
        if (sessionStorage.length) {
          const array = [];
          for (let i = 0; i <= sessionStorage.length - 1; i++) {
            array.push(sessionStorage.getItem(sessionStorage.key(i)));
          }
          localStorage.setItem(teamName, JSON.stringify({ array }));

          sessionStorage.clear();
          alert("team created succesfully");
          setCreateTeam(false);
          setTeamName("");
        } else {
          alert("team must contain atleast 1 member");
        }
      }
    } else {
      alert("team must have a name");
    }
  };
  return (
    <div>
      <Navbar
        updateSearchedData={updateSearchedData}
        genderList={genderList}
        domainList={domainList}
        availabilityList={availabilityList}
        filterAvailable={filterAvailable}
        filterGender={filterGender}
        filterDomain={filterDomain}
      />

      <button
        onClick={() => {
          history("/accounts/dashboard");
        }}
      >
        Dashboard
      </button>

      {mockData.length !== data.length ? (
        <div className="view-all-holder">
          <button onClick={viewAllData}>View all</button>
        </div>
      ) : (
        ""
      )}
      {!createTeam ? (
        <div className="create-team-btn-holder">
          <button
            onClick={() => {
              setCreateTeam(true);
            }}
            className="create-team-btn"
          >
            Create Team
          </button>
        </div>
      ) : (
        <div>
          <div className="create-cancel-holder">
            <button
              onClick={() => {
                teamCreation();
              }}
              className="viewteams-btn create-btn"
            >
              Create
            </button>
            <button
              onClick={() => {
                setCreateTeam(false);
                sessionStorage.clear();
              }}
              className="viewteams-btn cancel-btn"
            >
              Cancel
            </button>
          </div>
          <div className="input-set-holder">
            <input
              className="input"
              value={teamName}
              placeholder="Team name (must be unique)"
              onChange={(e) => {
                setTeamName(e.target.value);
              }}
            />
            <button
              onClick={() => {
                if (teamName !== "") {
                  if (localStorage.getItem(teamName)) {
                    alert("team name already exists");
                  }
                }
              }}
              className="create-team-btn"
            >
              Set Team Name
            </button>
          </div>
        </div>
      )}

      <div className="viewteams-btn-holder">
        <button
          onClick={() => {
            history("/accounts/teams");
          }}
          className="viewteams-btn"
        >
          View teams
        </button>
      </div>

      {currData.map((currUser) => {
        return (
          <Card currUser={currUser} key={currUser.id} createTeam={createTeam} />
        );
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
};

export default Body;
