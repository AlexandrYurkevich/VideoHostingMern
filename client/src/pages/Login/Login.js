import { useRef, useContext, useState } from "react";
import "./styles.css";
import { WebContext } from "../../WebContext"
import axios from "axios";

export default function Login() {
  const mail = useRef()
  const password = useRef()
  const [saveLogin, setSaveLogin] = useState(false);
  const { user, channel, setUser, setChannel } = useContext(WebContext)
  const [errormes, setErrormes] = useState();

  const onLogin = async () =>  {
    try {
      if(/^\s*$/.test(mail.current.value) || /^\s*$/.test(password.current.value)){
        setErrormes("fields can't consist only from spaces");
        return;
      }
      console.log(user);
      console.log(channel);
      const res = await axios.post("http://localhost:3001/auth/login", {
        email: mail.current.value,
        password : password.current.value
      });
      console.log("auth successed");
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
  <form className="auth-form" onSubmit={(e)=> { e.preventDefault(); onLogin()}}>
    <label>Login</label>
    <label style={{color: 'red'}}>{errormes}</label>
    <input
      className="auth-field"
      type="email"
      placeholder="E-mail"
      required
      ref={mail}
    />
    <input
      className="auth-field"
      type="password"
      placeholder="Password"
      required
      minLength={6}
      ref={password}
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
      <input className="auth-button" type="submit" value="Login"/>
      <a href="/register">
        <input className="auth-button" type="button" defaultValue="Register" />
      </a>
    </div>
  </form>
</div>
  );
}