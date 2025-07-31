import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Testimonial from '../Component/Home/Testimonial';
import { Link } from 'react-router-dom';
import { BASE_URL } from "../utils/api";
import useDynamicMeta from "../Component/MetaTagsComponent";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    mobile_no: '',
    company_name: '',
    privacy_policy: false,
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const turnstileRef = useRef(null); // ✅ Ref for Turnstile container
  const [captchaToken, setCaptchaToken] = useState("");
const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: "0x4AAAAAABlc_TZZ-c0n_W5R",
          callback: function (token) {
            setCaptchaToken(token);
          },
        });
        clearInterval(interval);
      }
    }, 300); // Retry every 300ms until loaded

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setError("Please complete the CAPTCHA.");
      setSuccess("");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          // subject: formData.subject,
          message: formData.message,
          mobile_no: formData.mobile_no,
          company_name: formData.company_name,
          privacy_policy: formData.privacy_policy,
          turnstile_token: captchaToken,
        }),
      });

      const result = await response.json();

      console.log("the response", result)

      if (response.ok && result.success) {
        setSuccess(result.message);
        setError("");
        setFormData({
          name: '',
          email: '',
          // subject: '',
          message: '',
          mobile_no: '',
          company_name: '',
          privacy_policy: false,
        });
      } else {
        setError(result.message || "Failed to send message.");
        setSuccess("");
      }
    } catch (err) {
      console.error("Error sending mail:", err);
      setError("Something went wrong!");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

//  ====================== Website Info ===================
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/info`);
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        console.error('Error fetching info:', error);
      }
    };

    fetchInfo();
  }, []);

// =================== Country Api ========================
 useEffect(() => {
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/country-with-phone-code`
      );
      const data = await response.json();
      if (data?.countrys) {
        // Sort the countries by phonecode in ascending order
        const sortedCountries = data.countrys.sort(
          (a, b) => parseInt(a.phonecode) - parseInt(b.phonecode)
        );
        setCountryList(sortedCountries);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  fetchCountries();
}, []);


 useEffect(() => {
        document.title = "Contact Us – MetricWave Insights";

        const metaDescription = document.querySelector("meta[name='description']");
        if (metaDescription) {
          metaDescription.setAttribute("content", "Get in touch with our team for inquiries, consultations, or custom market research requests.");
        } else {
          const meta = document.createElement('meta');
          meta.name = "description";
          meta.content = "Get in touch with our team for inquiries, consultations, or custom market research requests.";
          document.head.appendChild(meta);
        }
      }, []);

      useDynamicMeta(3);

  return (
    <>
      <div className="contact-section">
      </div>
      <section className="_main_contact my-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="contact-form p-3 _ad_new_contact">
                 {info && (
                  <div class="contact_info">
                    <div className="info-box text-center p-0 ">
                      <div>
                        <h5>Call US</h5>
                        <div className="d-flex flex-md-row flex-column align-items-center justify-content-center gap-5">
                          <a href={`tel:${info.mobile_no1}`} className="value d-block"><i className="fas fa-phone me-2"></i>+91 {info.mobile_no1}</a>
                          <a href={`tel:${info.office_1_mobile_no}`} className="value d-block"><i className="fas fa-phone me-2"></i>{info.office_1_mobile_no}</a>
                          <a href={`tel:${info.office_2_mobile_no}`} className="value d-block"><i className="fas fa-phone me-2"></i>{info.office_2_mobile_no}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="contact-form p-3 _ad_new_contact">
                 {info && (
                  <div class="contact_info">
                    <div className="info-box text-center p-0 ">
                      <div>
                        <h5>For Business Enquiry</h5>
                        <a href={`mailto:${info.email}`} className="underline value">
                          <i class="fa-solid fa-envelope me-2"></i>{info.email}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-12 d-flex">
              <div className="_ad_new_card">
                {/* <i className="fas fa-map-marker-alt call-icon ad_icon_contact" style={{ width: "80px" }}></i> */}
                <div>
                  <div className="label">Asia Pacific Intelligence Hub - INDIA:</div>
                  <div className="value"><i class="fa-solid fa-location-dot me-2"></i>{info?.address}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4  col-12 d-flex">
              <div className="_ad_new_card">
                {/* <i className="fas fa-envelope call-icon ad_icon_contact"></i> */}
                <div>
                  <div className="label">Sales Office - USA:</div>
                  <div className="value"><i class="fa-solid fa-location-dot me-2"></i>{info?.office_1_address}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4  col-12 d-flex">
              <div className="_ad_new_card">
                {/* <i className="fas fa-envelope call-icon ad_icon_contact"></i> */}
                <div>
                  <div className="label">Sales Office – ITALY:</div>
                  <div className="value"><i class="fa-solid fa-location-dot me-2"></i>{info?.office_2_address}</div>
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="col-lg-8 my-3 m-auto">
              <div className="contact-form">
                <h3 className="text-uppercase fw-bold mb-4 text-center">Get In Touch</h3>
                {success && <Alert variant="success">{success}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                {loading && <p>Sending message...</p>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border-secondary"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-secondary"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="mobile_group" className="mb-3">
                    <div className="row p-0">
                      {/* Country Code Field */}
                      <div className="col-4">
                        <Form.Control
                          as="select"
                          name="country_code"
                          value={formData.country_code}
                          onChange={handleChange}
                          className="border-secondary"
                          required
                        >
                          <option value="">Country Code</option>
                          {countryList.map((country) => (
                            <option key={country.id} value={country.phonecode}>
                              +{country.phonecode} ({country.name})
                            </option>
                          ))}
                        </Form.Control>
                      </div>

                      {/* Phone Number Field */}
                      <div className="col-8">
                        <Form.Control
                          type="text"
                          placeholder="Phone Number"
                          name="mobile_no"
                          value={formData.mobile_no}
                          onChange={handleChange}
                          className="border-secondary"
                          required
                        />
                      </div>
                    </div>
                  </Form.Group>


                  <Form.Group controlId="company_name" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Company Name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      className="border-secondary"
                      required
                    />
                  </Form.Group>

                  {/* <Form.Group controlId="subject" className="mb-3">
                    <Form.Control
                      type="text" 
                      placeholder="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="border-secondary"
                      required
                    />
                  </Form.Group> */}

                  <Form.Group controlId="formMessage" className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Write Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="border-secondary"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="privacyPolicy" className="mb-3">
                    <Form.Check
                      type="checkbox"
                      name="privacy_policy"
                      checked={formData.privacy_policy}
                      onChange={handleChange}
                      label={
                        <>
                          I agree to the <Link to="/terms-and-condition" target="_blank">Terms & Conditions</Link>
                        </>
                      }
                      required
                    />
                  </Form.Group>

                  <div className="mb-3">
                    <div ref={turnstileRef} className="cf-turnstile d-flex" />
                  </div>


                  <Button variant="warning" type="submit" className="text-white w-100" disabled={loading}>
                    {loading ? "Sending..." : "SEND MESSAGE"}
                  </Button>
                </Form>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* ----------------- Testimonial --------------- */}
      <div className="testimonial_section">
        <Testimonial type="swiper" />
        <div className="text-center">
        <Link to="/testimonials" className='main_btn'>View More</Link>
        </div>
      </div>
      {/* ----------------- Testimonial --------------- */}

    </>
  );
};

export default Contact;
