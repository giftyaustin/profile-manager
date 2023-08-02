import React, { useState } from 'react'
import { handleInputChange } from '../../utils/handleInputChange'

const Dashboard = () => {

let user = JSON.parse(sessionStorage.getItem('user')) || ''
const [currP, setCurrP] = useState('')
const [newP, setNewP] = useState('')
const [reNewP, setReNewP] = useState('')



const updatePassword = async()=>{
    try {
        if(currP && newP && reNewP){
            data = {currPassword:currP, newP, reNewP}
        }
        else{
            alert('fill all')
        }
        

    } catch (error) {
        
    }
}


  return (
    <div>
      {/* <p>email : {user.email}</p> */}

<p>To update password, enter current password and create new password</p>
      <input type="text" placeholder='enter current password' value={currP} onChange={(e)=>{handleInputChange(e, setCurrP)}}/>
      <input type="text" placeholder='new password' value={newP} onChange={(e)=>{handleInputChange(e, setNewP)}}/>
      <input type="text" placeholder='re-enter new password' value={reNewP} onChange={(e)=>{handleInputChange(e, setReNewP)}}/>
      <button>update password </button>
      <button>sign out</button>

    </div>
  )
}

export default Dashboard
