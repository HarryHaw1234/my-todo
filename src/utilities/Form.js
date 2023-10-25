import { useState } from "react";
export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }
  return (
    <form action="">
      <div className="email-input-field txt-field">
        <input
          type="text"
          id="email"
          name="email"
          required
          onChange={handleChange}
          value={formData.email}
        />
        <span></span>
        <label htmlFor="email">Email Address</label>
      </div>
      <div className="password-input-field txt-field">
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={handleChange}
          value={formData.password}
        />
        <span></span>
        <label htmlFor="password">Password</label>
      </div>
      <span className="txt-forgot">
        <a>Forgot Password?</a>
      </span>
      
      <span className="register-link">
        Already had an account? <a>Log in now!</a>
      </span>
    </form>
  );
}
