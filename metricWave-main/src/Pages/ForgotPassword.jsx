import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaFacebook } from "react-icons/fa";
import { BASE_URL } from "../utils/api";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');
    setSubmitted(false);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/forget-password`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Password reset link has been sent to your email.");
        setSubmitted(true);
        setFormData({ email: "" });
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ============ Website social info  Api ============
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

  // ============ Website social info  Api ============

  return (
    <>
      <section className="login_form">
        <div className="contact-area style-two inner">
          <div className="container">
            <div className="row add-backgroun">
              <div className="col-lg-5">
                <div className="login_content">
                  <img src={info?.logo} alt="Metric Wave Insights" />
                  <div className="social-icons d-flex gap-2">
                    {info && info.social_media && (
                      <>
                        {info.social_media.facebook && (
                          <Link to={info.social_media.facebook} target="_blank"><FaFacebook className="social-icon" /></Link>
                        )}
                        {info.social_media.instagram && (
                          <Link to={info.social_media.instagram} target="_blank"><FaInstagram className="social-icon" /></Link>
                        )}
                        {info.social_media.twitter && (
                          <Link to={info.social_media.twitter} target="_blank"><FaTwitter className="social-icon" /></Link>
                        )}
                        {info.social_media.youtube && (
                          <Link to={info.social_media.youtube} target="_blank"><FaYoutube className="social-icon" /></Link>
                        )}
                        {info.social_media.linkedin && (
                          <Link to={info.social_media.linkedin} target="_blank"><FaLinkedinIn className="social-icon" /></Link>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <form onSubmit={handleSubmit}>
                  <div className="single-contact-form">
                    <div className="contact-content">
                      <h4>Forgot Password</h4>
                    </div>

                    <div className="single-input-box">
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Your Email"
                      />
                      {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>

                    <div className="single-input-box">
                      <button type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Send'}
                      </button>
                    </div>
                  </div>
                </form>

                {message && (
                  <div className={`alert ${submitted ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {message}
                  </div>
                )}

                <div className="login_link_grp">
                  <Link to="/terms-and-condition">Term & Conditions</Link>
                  <Link to="/privacy-policies">Privacy Policy</Link>
                  <Link to="/gdpr-policies">Cookie Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
