import Slideshow from "../utilities/Slideshow";
import { Link } from 'react-router-dom'

function LoginPage() {
  const imgArr = ["first_vector.svg", "sec_vector.svg", "third_vector.svg"];
  return (
    <div className="login-page-parent">
      <div className="login-form">
        <img src= {"/logo.svg"} alt="Logo" className="logo-image"/>
        <h1>&#10003; Welcome</h1>
        <Link className="submit" to="/home">{localStorage.getItem("lists") ? "Go to list" : "Get Started"}</Link>
        <p>Start your days with Your ToDo</p>
      </div>
      <div className="login-slideshow-parent">
        <div className="login-slideshow">
            <Slideshow imgs={imgArr} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
