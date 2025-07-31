import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import FAQ from './FAQ';
import { BASE_URL } from "../utils/api";

const BecomeReseller = () => {
  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    email: "",
    mobile_no: "",
    designation: "",
    country: "",
    preciserequirement: "",
    policy: false
  });

  const [countries, setCountries] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  const [turnstileToken, setTurnstileToken] = useState("");

  const turnstileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!turnstileToken) {
      setAlert({ show: true, message: "Please complete the CAPTCHA verification.", variant: "danger" });
      return;
    }

    const payload = {
      ...formData,
      policy: formData.policy ? 1 : 0,
      turnstile_token: turnstileToken,
    };

    try {
      const response = await fetch(`${BASE_URL}/become-reseller`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setAlert({ show: true, message: "Request submitted successfully!", variant: "success" });
        setFormData({
          name: "",
          company_name: "",
          email: "",
          mobile_no: "",
          designation: "",
          country: "",
          preciserequirement: "",
          policy: false
        });
        setTurnstileToken(""); // Clear the token
      } else {
        setAlert({ show: true, message: result.message || "Something went wrong!", variant: "danger" });
      }
    } catch (error) {
      setAlert({ show: true, message: "Server error. Please try again.", variant: "danger" });
    }
  };

  // ============ Fetch Country List =============
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`${BASE_URL}/country-with-phone-code`);
        const data = await res.json();
        if (res.ok && data?.countrys) {
          setCountries(data.countrys);
        }
      } catch (err) {
        console.error("Failed to fetch countries", err);
      }
    };

    fetchCountries();
  }, []);

  // ============ Load Turnstile Widget =============
  useEffect(() => {
  if (window.turnstile && turnstileRef.current) {
    window.turnstile.render(turnstileRef.current, {
      sitekey: "0x4AAAAAABlc_TZZ-c0n_W5R", 
      callback: (token) => {
        setTurnstileToken(token);
      },
      theme: "light",
    });
  }
}, []);

useEffect(() => {
        document.title = "Become a Reseller – MetricWave Insights";
        
        const metaDescription = document.querySelector("meta[name='description']");
        if (metaDescription) {
          metaDescription.setAttribute("content", "Partner with us to resell our market research reports and grow your business.");
        } else {
          const meta = document.createElement('meta');
          meta.name = "description";
          meta.content = "Partner with us to resell our market research reports and grow your business.";
          document.head.appendChild(meta);
        }
      }, []);

  return (
    <>
      <div className="breadcrumb mb-4 p-3 d-flex justify-content-between align-items-center">
        <div>
          
          <Link to="/" data-discover="true"> <i className="fas fa-home"></i></Link>
        </div>
        <h4><strong>Become Reseller</strong></h4>
        <div></div>
      </div>

      <section className="reseller_section">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="contact-form">
                <h3 className="text-uppercase fw-bold mb-4 text-center">
                  Kindly fill the below form and we will contact you within 24 hours
                </h3>

                {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}

                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="row">
                    <div className="col-md-12">
                      <Form.Group controlId="formName" className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group controlId="formCompanyName" className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Company Name"
                          name="company_name"
                          value={formData.company_name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Control
                          type="email"
                          placeholder="Enter Your Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group controlId="formCountry" className="mb-3">
                        <Form.Select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                        >
                          <option value="" disabled>Select Your Country</option>
                          {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name} (+{country.phonecode})
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group controlId="formPhone" className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Enter Your Phone Number"
                          name="mobile_no"
                          value={formData.mobile_no}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-12">
                      <Form.Group controlId="formPosition" className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Job Title / Designation / Position"
                          name="designation"
                          value={formData.designation}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </div>
                    
                    <div className="col-12">
                      <Form.Group controlId="formMessage" className="mb-3">
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="Write Message"
                          name="preciserequirement"
                          value={formData.preciserequirement}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </div>
                    <div className="col-12">
                      <Form.Group controlId="privacyPolicy" className="mb-3">
                        <Form.Check
                          type="checkbox"
                          name="policy"
                          checked={formData.policy}
                          onChange={handleChange}
                          required
                          label={
                            <>
                              I agree to the <Link to="/terms-and-condition" target="_blank">Terms & Conditions</Link>
                            </>
                          }
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div ref={turnstileRef} className="cf-turnstile d-flex" />
                  </div>

                  <Button variant="warning" type="submit" className="text-white w-100">
                    SUBMIT REQUEST
                  </Button>
                </Form>
              </div>
            </div>
            <div className="col-md-4">
              <div className="">
                <FAQ contactSec={false} showHeading={false}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BecomeReseller;
