import { Link, useNavigate } from "react-router-dom";
import * as userService from "../../services/userService";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const validate = (name) => {
    const currentErrors = { ...errors };

    if (name === "email" || name === undefined) {
      if (!values.email) {
        currentErrors.email = "Email is required";
      } else {
        delete currentErrors.email;
      }
    }

    if (name === "password" || name === undefined) {
      if (!values.password) {
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
    setValues({
      ...values,
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
      const response = await userService.login({ ...values });
      if (response.code === 403) {
        setErrors({ error: "Email or password don't match" });
        return;
      }
      setAuth(response);
      navigate(-1);
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
              value={values.email}
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
              placeholder="Password"
              name="password"
              value={values.password}
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
              Submit
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
