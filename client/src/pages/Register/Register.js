import "./styles.css";
import { useRef, useContext, useState } from "react";
import { WebContext } from "../../WebContext";
import axios from "axios";

export default function Register() {
  const name = useRef()
  const mail = useRef()
  const password = useRef()
  const repeatPassword = useRef();
  const birthday = useRef()
  const [saveLogin, setSaveLogin] = useState(false);
  const { setUser, setChannel } = useContext(WebContext)

  const [errormes, setErrormes] = useState();

  const onRegister = async () =>  {
    try {
      if(/^\s*$/.test(name.current.value) || /^\s*$/.test(password.current.value)){
        setErrormes("fields can't consist only from spaces");
        return;
      }
      if(password.current.value != repeatPassword.current.value){
        setErrormes("Repeat password correctly");
        return;
      }
      const res = await axios.post("http://localhost:3001/auth/register", {
        name: name.current.value,
        email: mail.current.value,
        password : password.current.value,
        birthday: birthday.current.value
      });
      console.log("registration successed");
      if(saveLogin){
        console.log("login is saved");
        localStorage.setItem("reacttube-user", JSON.stringify(res.data.user._id))
	      localStorage.setItem("reacttube-channel", JSON.stringify(res.data.channel._id))
      }
      sessionStorage.setItem("reacttube-user", JSON.stringify(res.data.user._id))
      sessionStorage.setItem("reacttube-channel", JSON.stringify(res.data.channel._id))
      setUser(res.data.user);
      setChannel(res.data.channel);
    }
    catch (err) {
        setErrormes(err.response.data.message);
    }
  }
  
  return (
    <div className="auth-background">
      <form className="auth-form" onSubmit={(e)=> { e.preventDefault(); onRegister()}}>
        <label>Register</label>
        <label style={{color: 'red'}}>{errormes}</label>
        <input
          className="auth-field"
          type="text"
          placeholder="Username"
          required
          ref={name}
        />
        <div className="date-input">
          <label>Birth</label>
          <input type="date" min="1900-1-1" max={(new Date()).toISOString()} required ref={birthday} />
        </div>
        <input className="auth-field" type="email" placeholder="E-mail" required ref={mail}/>
        <input
          className="auth-field" type="password" placeholder="Password" required minLength={6}
          ref={password}
        />
        <input
          className="auth-field"
          type="password"
          placeholder="Repeat password"
          required
          minLength={6}
          ref={repeatPassword}
        />
        <div className="reset-forget">
          <input className="auth-button" type="reset" value="Reset" />
          <input className="auth-button" type="button" defaultValue="Forget?" />
        </div>
        <div className="remember" style={{ display: "flex" }}>
          <input type="checkbox" onChange={(e)=>setSaveLogin(!saveLogin)}/>
          <label>Remember me</label>
        </div>
        <div className="logreg">
          <input className="auth-button" type="submit" value="Register" />
          <a href="/login">
            <input className="auth-button" type="button" defaultValue="Login" />
          </a>
        </div>
      </form>
    </div>
  );
}