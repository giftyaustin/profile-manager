import React from "react";
import "./pages.css";

const PaginationBar = ({ pages, currPage , updatePage,prevPage,nextPage}) => {
    const updatePageNumber=(i)=>{
            updatePage(i);
    }
  return (
    <div>
      <div className="pagination-holder">
        <div>
          {currPage !== 0 ? <button onClick={prevPage}>prev</button> : ""}
          {currPage !== pages - 1 ? <button onClick={nextPage}>next</button> : ""}
        </div>
        <div className="page-number-holder">
          {Array(pages)
            .fill(0)
            .map((c, i) => {
              return (
                <div className={currPage===i?"page-number-outline outline-glow":"page-number-outline"} key={i}>
                  <span className="page-number" onClick={()=>{
                    updatePageNumber(i)
                  }}>{i + 1}</span>
                </div>
              );
            })}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PaginationBar;
