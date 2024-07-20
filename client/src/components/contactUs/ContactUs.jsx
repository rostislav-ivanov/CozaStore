import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";

import styles from "./ContactUs.module.css";
import * as contactService from "../../services/contactService";
import * as profileService from "../../services/profileService";
import { AuthContext } from "../../context/authContext";

export default function ContactUs() {
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    email: "",
    firstName: "",
    lastName: "",
    subject: "",
    content: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileData = await profileService.getProfile();
        if (profileData) {
          setMessage({
            ...message,
            email: profileData.email,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
          });
        }
      } catch (error) {
        if (error.message.includes("403")) {
          navigate("/login");
        } else {
          alert(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const onChangeHandler = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern for basic email validation

    if (!message.firstName) {
      newErrors.firstName = "First name is required.";
    }
    if (!message.lastName) {
      newErrors.lastName = "Last name is required.";
    }
    if (!message.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(message.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!message.subject) {
      newErrors.subject = "Subject is required.";
    }
    if (!message.content) {
      newErrors.content = "Message is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    try {
      setLoading(true);
      const responce = await contactService.sendMessage(message);
      alert(`Message sent successfully. ${responce.content}`);
    } catch (error) {
      if (error.message.includes("403")) {
        navigate("/login");
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="justify-content-md-center py-5">
      {loading && (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <div className={loading ? styles.loadingOverlay : ""}>
        <h4 className="text-center pb-3 opacity-75">Contact us</h4>
        <Row>
          <Col md="4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.250325005849!2d23.306474376639823!3d42.69842007116351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8541670b1487%3A0x469a377d552251e0!2z0JzQvtC7INGK0YQg0KHQvtGE0LjRjw!5e0!3m2!1sbg!2sbg!4v1721456381265!5m2!1sbg!2sbg"
              className="h-100 w-100"
              style={{ border: "0" }}
              loading="lazy"
            ></iframe>
          </Col>

          <Col md="5">
            <Form onSubmit={onSubmitHandler}>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formFirstName">
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={message.firstName}
                      onChange={onChangeHandler}
                    />
                    {errors.firstName && (
                      <div className={styles.error}>{errors.firstName}</div>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formLastName">
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={message.lastName}
                      onChange={onChangeHandler}
                    />
                    {errors.lastName && (
                      <div className={styles.error}>{errors.lastName}</div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={message.email}
                  onChange={onChangeHandler}
                />
                {errors.email && (
                  <div className={styles.error}>{errors.email}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={message.subject}
                  onChange={onChangeHandler}
                />
                {errors.subject && (
                  <div className={styles.error}>{errors.subject}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formContent">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="content"
                  placeholder="Message"
                  value={message.content}
                  onChange={onChangeHandler}
                />
                {errors.content && (
                  <div className={styles.error}>{errors.content}</div>
                )}
              </Form.Group>
              <Button type="submit" color="primary" className="mt-3">
                Send
              </Button>
            </Form>
          </Col>
          <Col md="3">
            <i className="fs-16 zmdi zmdi-map"></i>
            <p>
              <small>
                ж.к. Зона Б-5, бул. „Александър Стамболийски“ 101 A, 1303 София
              </small>
            </p>
            <i className="fs-16 zmdi zmdi-phone"></i>
            <p>
              <small>+359 888 888 888</small>
            </p>
            <i className="fs-16 zmdi zmdi-email"></i>
            <p>
              <small>cozastore@gmail.com</small>
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
