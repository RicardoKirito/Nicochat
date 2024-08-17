import { useState } from "react"; 
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



export default function LoginPage() {
    
    const [username, setUsername]  = useState('');
    const [password, setPassword] = useState('');
    const {login, isAuth, error} = useAuth();
    const navigator = useNavigate()
    if(isAuth) navigator('/chat')
    const handler= async (e)=>{
        e.preventDefault()
        const cred = {
            username,
            password
        }
        login(cred)
        
    }

  return (

    <div className="formContainer">
    <div className="formWrapper">
      <span className="Logo"><img src="/nicochatlogo.png" style={{height: "100px", filter: "drop-shadow(2px 26px 29px white)"}}></img></span>
      <span className="tiitle">Login</span>
        { 
          error.map((err, i)=>(
              <p className="error" key={i}>{err}</p>
          ))
        }
      <form onSubmit={handler}>
        <input onChange={e=>setUsername(e.target.value.toLocaleLowerCase())} value={username} type="text" placeholder="Username" name="username" required autoComplete="off"/>
        <input onChange={e=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" name="password" required autoComplete="off"/>
        <button>Log In</button>
        <p> Dont have an account yet? <a href="" onClick={()=>navigator('/register')}>Sign Up</a></p>
      </form>
    </div>
  </div>
  )
}
