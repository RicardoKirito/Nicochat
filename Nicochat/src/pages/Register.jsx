import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";


export function Register(){
    const {register, isAuth, error} = useAuth();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [imgPreview, setImgPreview] = useState();

    if(isAuth) navigate('/chat')
    
    const handle = async (e)=>{
        e.preventDefault()
        const form = e.target;
        const newUser = {
            username: form.username.value.toLocaleLowerCase(),
            email: form.email.value.toLocaleLowerCase(),
            password: form.password.value,
            file,
        }
        register(newUser);
        //console.log(user)
    }

    function renderPriview(e){
      const file = e.target.files[0];
      const render = new FileReader();
      render.readAsDataURL(file);
      render.onload = ()=>{
        setFile({
          info: file.name,
          data: render.result
        })
        setImgPreview(render.result);
      }
    }
    return(
        <div className="formContainer">
        <div className="formWrapper">
          <span className="Logo" style={{fontFamily: "Nunito", fontWeight: "900", fontSize: "1.5rem", }}>Nicochat</span>
          <span className="title">Register</span>
          {
            error.map((err, i)=>(
                <p className="error" key={i}>{err}</p>
            ))
            }
          <form onSubmit={handle}>
            <div className="preview">
              <img src={imgPreview} ></img>
            </div>
            <input type="file" hidden name="image" id="image" onChange={renderPriview} />
            <label htmlFor="image">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                  <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg>
              </span>
              <span>Upload a profile picture</span>
            </label>
            <input type="text" placeholder="Username" name="username"/>
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password"/>
            <button>Sign Up</button>
            <p>Already have an account? <a href="" onClick={()=>navigate('/login')}>Login</a></p>
          </form>
        </div>
      </div>
    )
}