import { Link, useNavigate } from "react-router-dom";
import * as userService from "../../services/userService";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const onSubmitLoginHandler = async (e) => {
    e.preventDefault();
    const currentErrors = {};
    // email is required
    if (!values.email) {
      currentErrors.email = "Email is required";
    } else if (
      !values.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    ) {
      currentErrors.email = "Email is invalid";
    }

    // password is required
    if (!values.password) {
      currentErrors.password = "Password is required";
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors({ ...currentErrors });
      return;
    }

    try {
      const response = await userService.login({ ...values });
      // password or email is incorrect
      if (response.code === 403) {
        currentErrors.error = response.message;
        setErrors({ ...currentErrors });
        return;
      }
      // set auth context
      setAuth(response);
    } catch (error) {
      console.log(error.message);
    }

    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    // <!-- Login Page ( Only for Guest users ) -->
    <section id="login-page" className="auth">
      <form id="login" onSubmit={onSubmitLoginHandler}>
        <div className="container">
          <div className="brand-logo"></div>
          <h1>Login</h1>
          {errors.error && <span className="error">{errors.error}</span>}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Sokka@gmail.com"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label htmlFor="login-pass">Password:</label>
          <input
            type="password"
            id="login-password"
            name="password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <input type="submit" className="btn submit" value="Login" />
          <p className="field">
            <span>
              If you don't have profile click <Link to="/register">here</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}
