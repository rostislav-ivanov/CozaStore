import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

  const validate = (name) => {
    const currentErrors = { ...errors };
    delete currentErrors.error;

    if (name === "email" || name === undefined) {
      if (!user.email) {
        currentErrors.email = "Email is required";
      } else if (
        !user.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
      ) {
        currentErrors.email = "Email is invalid";
      } else {
        delete currentErrors.email;
      }
    }

    if (name === "password" || name === undefined) {
      if (!user.password) {
        currentErrors.password = "Password is required";
      } else if (user.password.length < 6) {
        currentErrors.password = "Password must be at least 6 characters";
      } else {
        delete currentErrors.password;
      }
    }

    if (name === "confirmPassword" || name === undefined) {
      if (!user.confirmPassword) {
        currentErrors.confirmPassword = "Confirm password is required";
      } else if (user.password !== user.confirmPassword) {
        currentErrors.confirmPassword = "Passwords do not match";
      } else {
        delete currentErrors.confirmPassword;
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
      const response = await userService.register(user);
      // If email already exists
      if (response.code > 200) {
        currentErrors.error = "A user with the same email already exists";
        setUser({ ...user, password: "", confirmPassword: "" });
        setErrors({ ...currentErrors });
        return;
      }
      setAuth(response);

      navigate("/");
    } catch (error) {
      console.error(error);
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.confirmPassword}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          {errors.error && <p className="text-danger">{errors.error}</p>}

          <div className="d-grid gap-2 pt-3">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
          <p className="mt-3">
            If you already have an account, click <Link to="/login">login</Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
}
