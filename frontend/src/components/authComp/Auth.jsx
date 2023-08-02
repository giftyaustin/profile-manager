import React, { useState } from "react";
import { loginUser, registerUser } from "../../controllers/userController";
import { handleInputChange } from "../../utils/handleInputChange";
import { useNavigate } from "react-router-dom";

const Auth = () => {


const history = useNavigate()



  const [login, setLogin] = useState(false);
  const [rEmail, setREmail] = useState('')
  const [rPassword, setRPassword] = useState('')
  const [lEmail, setLEmail] = useState('')
  const [lPassword, setLPassword] = useState('')





  return (
    <div>
      {login === true ? (
        <>
          {/* login */}
          <form onSubmit={(e)=>{loginUser(e,lEmail, lPassword, history)}}>
            <label htmlFor="remail">Email</label><br />
            <input type="email" placeholder="Enter email" required value={lEmail} onChange={(e)=>{handleInputChange(e,setLEmail)}} />
            <br />
            <label htmlFor="rpassword">Password</label><br />
            <input type="password" placeholder="enter password" required value={lPassword} onChange={(e)=>{handleInputChange(e,setLPassword)}}/>
            <br />
            <button type="submit">login</button>

            
          </form>
          <div>
              No account ? <button onClick={()=>{setLogin(false)}}>Sign up</button>
            </div>
        </>
      ) : (
        <>
            {/* register */}
          <form onSubmit={(e)=>{registerUser(e,rEmail, rPassword, history)}}>
            <label htmlFor="remail">Email</label><br />
            <input type="text" placeholder="Enter email" required value={rEmail} onChange={(e)=>{handleInputChange(e,setREmail)}}/>
            <br />
            <label htmlFor="rpassword">Password</label><br />
            <input type="password" placeholder="create password" required value={rPassword} onChange={(e)=>{handleInputChange(e,setRPassword)}}/>
            <br />
            <button type="submit">Create account</button>

            
          </form>
          <div>
              Have an account <button onClick={()=>{setLogin(true)}}>Login</button>
            </div>
        </>
      )}
    </div>
  );
};

export default Auth;
