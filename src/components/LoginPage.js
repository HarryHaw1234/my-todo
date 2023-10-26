import Slideshow from "../utilities/Slideshow";
import { Link } from 'react-router-dom'

function LoginPage() {
  const imgArr = ["first_vector.svg", "sec_vector.svg", "third_vector.svg"];
  return (
    <div className="login-page-parent">
      <div className="login-form">
        <img src= {"/logo.svg"} alt="logo"/>
        <h1>&#10003; Welcome</h1>
        <Link className="submit" to="/home">Get Started</Link>
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
