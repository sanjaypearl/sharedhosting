import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BASE_URL } from "../utils/api";
import useDynamicMeta from '../Component/MetaTagsComponent';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        const response = await fetch(`${BASE_URL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log("Login Response:", data);

        if (data.status) {
          localStorage.setItem('isLoggedIn', true); // 🔐 Save login flag
          setMessage(data.message || 'Login successful!');
          setSubmitted(true);
          setFormData({ email: '', password: '' });

          setTimeout(() => {
            setSubmitted(false); // Hide success message
            navigate('/');       // Redirect to homepage
          }, 1000);
        } else {
          setMessage(data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Login Error:', error);
        setMessage('Something went wrong. Please try again.');
      }
    }
  };



  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

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

  useDynamicMeta(7);

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
                      <h4>Login</h4>
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

                    <div className="single-input-box position-relative">
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="********"
                      />
                      {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                      <label>
                        <input type="checkbox" defaultChecked /> Remember me
                      </label>
                      <span className="psw">
                        <Link to="/forgot-password" style={{ color: "#ff6600", textDecoration: "none" }}>
                          Forgot password?
                        </Link>
                      </span>
                    </div>

                    <div className="single-input-box">
                      <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                      </button>
                    </div>

                    <span className="psw text-white">
                      Don't have an Account?{" "}
                      <Link to="/signup" style={{ color: "#ff6600", textDecoration: "none" }}>
                        Sign up
                      </Link>
                    </span>
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

export default Login;
