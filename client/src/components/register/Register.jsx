import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
import * as userService from "../../services/userService";

export default function Register() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const onSubmitRegisterHandler = async (e) => {
    e.preventDefault();

    const currentErrors = {};
    // Validate email with regex
    if (user.email === "") {
      currentErrors.email = "Email is required";
    } else if (
      !user.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    ) {
      currentErrors.email = "Email is invalid";
    }

    // Validate password min length 6
    if (user.password === "") {
      currentErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      currentErrors.password = "Password must be at least 6 characters";
    }

    // Validate confirm password
    if (user.confirmPassword === "") {
      currentErrors.confirmPassword = "Confirm password is required";
    } else if (user.password !== user.confirmPassword) {
      currentErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors({ ...currentErrors });
      return;
    }

    try {
      const response = await userService.register(user);
      // If email already exists
      if (response.code > 200) {
        currentErrors.error = response.message;
        setErrors({ ...currentErrors });
        return;
      }
      setAuth(response);

      // Navigate back to the previous page
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <!-- Register Page ( Only for Guest users ) -->
    <section id="register-page" className="content auth">
      <form id="register" onSubmit={onSubmitRegisterHandler}>
        <div className="container">
          <div className="brand-logo"></div>
          <h1>Register</h1>
          {errors.error && <span className="error">{errors.error}</span>}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="maria@email.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            name="password"
            id="register-password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <label htmlFor="con-pass">Confirm Password:</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}

          <input className="btn submit" type="submit" value="Register" />

          <p className="field">
            <span>
              If you already have profile click <Link to="/login">here</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}
