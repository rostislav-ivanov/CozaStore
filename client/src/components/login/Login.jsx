import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import * as authService from "../../services/authService";
import * as userService from "../../services/userService";
import { AuthContext } from "../../context/authContext";
import { UserContext } from "../../context/userContext";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const { setUser: setUserContext } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const validate = (name) => {
    const currentErrors = { ...errors };
    delete currentErrors.error;

    if (name === "email" || name === undefined) {
      if (!user.email) {
        currentErrors.email = "Email is required";
      } else {
        delete currentErrors.email;
      }
    }

    if (name === "password" || name === undefined) {
      if (!user.password) {
        currentErrors.password = "Password is required";
      } else {
        delete currentErrors.password;
      }
    }

    setErrors(currentErrors);
    return currentErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    validate(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentErrors = validate();

    if (Object.keys(currentErrors).length > 0) {
      return;
    }

    try {
      const response = await authService.login({ ...user });
      if (response.code === 403) {
        setUser({ email: "", password: "" });
        setErrors({ error: "Email or password don't match" });
        return;
      }
      setAuth(response);
      const extendedUser = await userService.getUser(response);
      setUserContext(extendedUser);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Row className="mt-5 mb-5 justify-content-center">
      <Col className="col-4">
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={user.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={user.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.password}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {errors.error && <p className="text-danger">{errors.error}</p>}

          <div className="d-grid gap-2 pt-3">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
          <p className="mt-3">
            If you don't have an account, click{" "}
            <Link to="/register">register</Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
}
