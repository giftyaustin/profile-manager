import React from 'react';
import "./pages.css"

const PaginationBar = () => {
  return (
    <div>
      <div className='pagination-holder'>
        <div>
            pages
        </div>
        <div>
            <div>
                <button>prev</button>
                <button>next</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PaginationBar
