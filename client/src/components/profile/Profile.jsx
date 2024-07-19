import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import * as profileService from "../../services/profileService";
import * as shippingService from "../../services/shippingService";
import styles from "./Profile.module.css";

export default function Profile() {
  const [profile, setProfile] = useState({
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: { id: "", name: "" },
    office: { id: "", name: "" },
  });
  const [initialProfile, setInitialProfile] = useState(null);
  const [cities, setCities] = useState([]);
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const citiesData = await shippingService.getCities();
        setCities(citiesData);
        setLoading(false);
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    };
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileData = await profileService.getProfile();
        const profileState = {
          _id: profileData._id,
          email: profileData.email,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phone: profileData.phone,
          city: { id: "", name: profileData.shippingCity },
          office: { id: "", name: profileData.shippingOffice },
        };
        setProfile(profileState);
        setInitialProfile(profileState);
        setLoading(false);
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    };
    fetchCities();
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile.city.id === undefined) {
      return;
    }

    const fetchOffices = async () => {
      try {
        setLoading(true);
        const officesData = await shippingService.getOffices(profile.city.id);
        setOffices(officesData);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };
    fetchOffices();
  }, [profile.city]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "city") {
      const id = e.target.options[e.target.selectedIndex].id;
      setProfile((prevProfile) => ({
        ...prevProfile,
        city: { id, name: value },
        office: { id: "", name: "" },
      }));
    } else if (name === "office") {
      const id = e.target.options[e.target.selectedIndex].id;
      setProfile((prevProfile) => ({
        ...prevProfile,
        office: { id, name: value },
      }));
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const onCancelHandler = () => {
    if (initialProfile) {
      setProfile(initialProfile);
    }
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!profile.city.name) {
      newErrors.city = "City is required.";
    }
    if (!profile.office.name) {
      newErrors.office = "Office is required.";
    }
    if (!profile.firstName) {
      newErrors.firstName = "First name is required.";
    }
    if (!profile.lastName) {
      newErrors.lastName = "Last name is required.";
    }
    if (!profile.phone) {
      newErrors.phone = "Phone is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const profileData = {
      _id: profile._id,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      shippingCity: profile.city.name,
      shippingOffice: profile.office.name,
    };

    try {
      await profileService.updateProfile(profileData);
      alert("Profile updated successfully");
      setInitialProfile(profile);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <Container className="justify-content-md-center py-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h4 className="text-center pb-3 opacity-75">Your Profile</h4>
          <p className="text-center small">
            Your profile information is used for shipping purposes only.
          </p>
          {loading && (
            <div className={styles.spinnerContainer}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          <div className={loading ? styles.loadingOverlay : ""}>
            <Form
              className="border rounded p-3"
              style={{ pointerEvents: loading ? "none" : "auto" }}
              onSubmit={onSubmitHandler}
            >
              <Form.Group className="my-2" controlId="formEmail">
                <Form.Label className="small">
                  Login email cannot be changed
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  disabled
                  value={profile.email}
                />
              </Form.Group>
              <Form.Group className="my-2" controlId="formFirstName">
                <Form.Label className="small">First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={onChangeHandler}
                />
                {errors.firstName && (
                  <div className={styles.error}>{errors.firstName}</div>
                )}
              </Form.Group>
              <Form.Group className="my-2" controlId="formLastName">
                <Form.Label className="small">Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={onChangeHandler}
                />
                {errors.lastName && (
                  <div className={styles.error}>{errors.lastName}</div>
                )}
              </Form.Group>
              <Form.Group className="my-2" controlId="formPhoneNumber">
                <Form.Label className="small">Phone number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={onChangeHandler}
                />
                {errors.phone && (
                  <div className={styles.error}>{errors.phone}</div>
                )}
              </Form.Group>
              <Form.Group className="my-2" controlId="formCity">
                <Form.Label className="small">
                  City of ECONT shipping office
                </Form.Label>
                <Form.Select
                  name="city"
                  id="city"
                  value={profile.city.name}
                  onChange={onChangeHandler}
                >
                  <option value="" disabled>
                    Choose a city
                  </option>
                  {cities.length > 0 &&
                    cities.map((city) => (
                      <option key={city.id} id={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                </Form.Select>
                {errors.city && (
                  <div className={styles.error}>{errors.city}</div>
                )}
              </Form.Group>
              <Form.Group className="my-2" controlId="formAddress">
                <Form.Label className="small">
                  Address of ECONT shipping office
                </Form.Label>
                <Form.Select
                  name="office"
                  id="office"
                  value={profile.office.name}
                  onChange={onChangeHandler}
                >
                  <option value="" disabled>
                    Choose an office
                  </option>
                  {offices.length > 0 &&
                    offices.map((office) => (
                      <option
                        key={office.id}
                        id={office.id}
                        value={office.name}
                      >
                        {office.name}
                      </option>
                    ))}
                </Form.Select>
                {errors.office && (
                  <div className={styles.error}>{errors.office}</div>
                )}
              </Form.Group>
              <Button type="submit" className="btn mt-3">
                Save
              </Button>
              <Button
                type="button"
                className="btn ms-3 mt-3"
                onClick={onCancelHandler}
              >
                Cancel
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
