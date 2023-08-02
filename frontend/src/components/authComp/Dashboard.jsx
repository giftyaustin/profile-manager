import React, { useState , useEffect} from 'react'
import { handleInputChange } from '../../utils/handleInputChange'
import { sendGETRequest, sendPutRequest } from '../../utils/sendRequest'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
const history = useNavigate('')
let user = JSON.parse(sessionStorage.getItem('user')) || ''
const [currP, setCurrP] = useState('')
const [newP, setNewP] = useState('')
const [reNewP, setReNewP] = useState('')



const updatePassword = async()=>{
    try {
        if(currP && newP && reNewP){
            if(newP===reNewP){ const data = {currPassword:currP, newP, reNewP}
            const response = await sendPutRequest('/api/auth/update', data)
            alert(response.message)}
            else{
                alert('new passwords dont match')
            }
           
        }
        else{
            alert('fill all')
        }
        

    } catch (error) {
        alert(error.message)
    }
}



const getUser = async()=>{
    const response = await sendGETRequest('/api/auth/user')
    if(response.success){
      console.log(response.user)
      sessionStorage.setItem('user', JSON.stringify(response.user))
    }else{
      alert('no user')
      history('/')
    }
  }
  
  useEffect(()=>{
    getUser()
  },[])



  const logoutUser = async()=>{
    const response =  await sendGETRequest('/api/auth/logout')
    history('/')
    if(response.success){
        alert(response.message)
    }
  }


  return (
    <div>
      <p>email : {user.email}</p>

<p>To update password, enter current password and create new password</p>
      <input type="text" placeholder='enter current password' value={currP} onChange={(e)=>{handleInputChange(e, setCurrP)}}/>
     <br /> <input type="text" placeholder='new password' value={newP} onChange={(e)=>{handleInputChange(e, setNewP)}}/>
     <br /> <input type="text" placeholder='re-enter new password' value={reNewP} onChange={(e)=>{handleInputChange(e, setReNewP)}}/>
      <br /><button onClick={updatePassword}>update password </button>
     <br /> <button onClick={logoutUser}>sign out</button>

    </div>
  )
}

export default Dashboard
