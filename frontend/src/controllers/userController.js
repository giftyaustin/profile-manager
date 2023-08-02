import { sendPostRequest } from "../utils/sendRequest"



// user registration
export const registerUser=async(e,email, password, history)=>{
  try {
    e.preventDefault()
    const data = {email, password}
    const response = await sendPostRequest('/api/auth/register', data)
    if(response.success){
        history('/accounts')
    }
    else{
        alert(response.message)
    }
  } catch (error) {
    console.log(error)
  }
    
    
}


// user login

export const loginUser=async(e,email, password, history)=>{
    try {
      e.preventDefault()
      const data = {email, password}
      const response = await sendPostRequest('/api/auth/login', data)
      if(response.success){
          history('/accounts')
      }
      else{
          alert(response.message)
      }
    } catch (error) {
      console.log(error)
    }
      
      
  }
  

