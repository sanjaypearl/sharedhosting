import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Form, Button, Alert } from "react-bootstrap";
import axios from 'axios';
import { BASE_URL } from "../utils/api";

const Footer = () => {

  const [formData, setFormData] = useState("");
  const turnstileRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState('');
  const [errors, setErrors] = useState({});

  const footerLinks = [
    { label: 'About Us', url: '/about' },
    { label: 'Services', url: '/services' },
    { label: 'Career', url: '/career' },
    { label: 'Customer FAQs', url: '/faq' },
    { label: 'Contact Us', url: '/contact' },
  ];
  const footerLinks3 = [
    { label: 'Report Store', url: '/report-store' },
    { label: 'Press Release', url: '/press-release' },
    { label: 'Research Methology', url: '/research-methology' },
    { label: 'Blogs', url: '/blog' },
    { label: 'Testimonial', url: '/testimonials' },
    { label: 'How to Order', url: '/how-to-order' },
  ];
  const footerLinks2 = [
    { label: 'Terms & Conditions', url: '/terms-and-condition' },
    { label: 'Privacy Policy', url: '/privacy-policies' },
    { label: 'GDPR Policy', url: '/gdpr-policy' },
    { label: 'Cookie Policy', url: '/cookies' },
    { label: 'Refund Policy', url: '/refund-policy' },
    { label: 'Become a Reseller', url: '/become-reseller' },
  ];


  useEffect(() => {
    if (!document.getElementById('cf-turnstile-script')) {
      const script = document.createElement('script');
      script.id = 'cf-turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const interval = setInterval(() => {
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: '0x4AAAAAABlc_TZZ-c0n_W5R', // Replace with actual site key from Cloudflare Turnstile
          callback: (token) => {
            setCaptchaToken(token);
            setErrors(prev => ({ ...prev, captcha: null }));
          },
          'error-callback': () => {
            setCaptchaToken('');
            setErrors(prev => ({ ...prev, captcha: 'Captcha error. Please try again.' }));
          },
          'expired-callback': () => {
            setCaptchaToken('');
            setErrors(prev => ({ ...prev, captcha: 'Captcha expired. Please complete again.' }));
          },
        });
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);


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


  const [email, setEmail] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setErrors({});

    if (!captchaToken) {
      setErrors({ captcha: 'Please complete the CAPTCHA.' });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/subscriber`,
        {
          email,
          turnstile_token: captchaToken, // Send token to backend (if backend is validating)
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setSuccessMsg('Thank you for subscribing!');
        setEmail('');
        setCaptchaToken('');
        window.turnstile?.reset?.(); // Reset CAPTCHA after success
      } else {
        if (response.data.errors?.email) {
          setErrorMsg(response.data.errors.email[0]);
        } else {
          setErrorMsg(response.data.message || 'Subscription failed. Please try again.');
        }
      }
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <footer className="py-3 py-md-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12">
            <div className="contact_list">
              <h3>Contact Us:</h3>
              <ul>
                <li>
                  <div className="info-box d-flex align-items-start gap-4 ">
                    <div>
                      <div className="label">United State</div>
                      {info ? (
                        <>
                          <a href={`tel:${info.office_1_mobile_no}`} className="underline value mb-2">
                            <i class="fas fa-phone me-2"></i>{info.office_1_mobile_no}
                          </a>
                        </>
                      ) : (
                        <p>Loading contact info...</p>
                      )}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="info-box d-flex align-items-start gap-4 ">
                    <div>
                      <div className="label">Italy</div>
                      {info ? (
                        <>
                          <a href={`tel:${info.office_2_mobile_no}`} className="underline value mb-2">
                            <i class="fas fa-phone me-2"></i>{info.office_2_mobile_no}
                          </a>
                        </>
                      ) : (
                        <p>Loading contact info...</p>
                      )}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="info-box d-flex align-items-start gap-4 ">
                    <div>
                      <div className="label">India</div>
                      {info ? (
                        <>
                          <a href={`tel:${info.mobile_no1}`} className="underline value mb-2">
                            <i class="fas fa-phone me-2"></i>+91-{info.mobile_no1}
                          </a>
                        </>
                      ) : (
                        <p>Loading contact info...</p>
                      )}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-md-12'>
            <div className="footer_item_head">
              <Link className="navbar-brand" to="/"><img src={info?.logo} alt={info?.site_name} /></Link>

              {info ? (
                <>
                  <div className="social-icons d-flex gap-2">
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
                  </div>
                </>
              ) : (
                <p>Loading social links...</p>
              )}
            </div>
          </div>

          <div className='col-12 col-md-3'>
            <div className="footer_item">
              <h3 className="footer_heading">For Business Enquiry</h3>
              {info ? (
                <>
                  <div className="d-flex flex-column mb-3">
                    <a href={`mailto:${info.email}`} className="underline value mb-2">
                      <i class="fa-solid fa-envelope me-2"></i>{info.email}
                    </a>
                  </div>
                </>
              ) : (
                <p>Loading contact info...</p>
              )}
              <h3 className="footer_heading">Asia Pacific Intelligence Hub - INDIA:</h3>
              {info ? (
                <>
                  <div className="d-flex flex-column ">
                    <p className="mb-2"><i class="fa-solid fa-location-dot me-2"></i>{info.address}</p>
                  </div>
                </>
              ) : (
                <p>Loading contact info...</p>
              )}
              <h3 className="footer_heading">Sales Office - USA:</h3>
              {info ? (
                <>
                  <div className="d-flex flex-column ">
                    <p className="mb-2"><i class="fa-solid fa-location-dot me-2"></i>{info.office_1_address}</p>
                  </div>
                </>
              ) : (
                <p>Loading contact info...</p>
              )}
              <h3 className="footer_heading">Sales Office – ITALY:</h3>
              {info ? (
                <>
                  <div className="d-flex flex-column ">
                    <p className="mb-2"><i class="fa-solid fa-location-dot me-2"></i>{info.office_2_address}</p>
                  </div>
                </>
              ) : (
                <p>Loading contact info...</p>
              )}
            </div>
          </div>

          <div className='col-6 col-md-2'>
            <div className="footer_item">
              <h3 className="footer_heading">Menu</h3>
              <ul className="list-unstyled">
                {footerLinks.map((link, index) => (
                  <li key={index} className='nav-item'>
                    <Link to={link.url} className="nav-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='col-6 col-md-2'>
            <div className="footer_item">
              <h3 className="footer_heading">Insight Club</h3>
              <ul className="list-unstyled">
                {footerLinks3.map((link, index) => (
                  <li key={index} className='nav-item'>
                    <Link to={link.url} className="nav-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <div className="footer_item">
              <h3 className="footer_heading">Help</h3>
              <ul className="list-unstyled">
                {footerLinks2.map((link, index) => (
                  <li key={index} className='nav-item'>
                    <a href={link.url} className="nav-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='col-12 col-md-3'>
            <div className="footer_item">
              <h3 className="footer_heading">Newsletter</h3>
              <div className="newsletter_footer_section">
                {successMsg && <Alert variant="success">{successMsg}</Alert>}
                {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-dark border-secondary form-control bg-transparent"
                      required
                    />
                  </Form.Group>
                  <div ref={turnstileRef} className="cf-turnstile mb-2" />
                  {errors.captcha && <div className="text-danger">{errors.captcha}</div>}
                  <Button type="submit" className="newsletter_btn" disabled={loading}>
                    {loading ? 'Signing up...' : 'Sign Up'}
                  </Button>
                </Form>
              </div>
            </div>
            <div className="footer_item mt-4">
              <h3 className="footer_heading">We Accept Payments</h3>
              <div className="newsletter_footer_section">
                <a href="#"><img src="Images/payment_card.webp" alt="" /></a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <p class="mb-0 text-dark font-weight-500 d-flex justify-content-center align-items-center flex-wrap">
            2025 © All Rights Reserved By
            <a href="/" target="_blank" class="text-dark mx-2">Metric Wave Insights</a> And Powered By
            <a href="https://www.pearlorganisation.com/" target="_blank" class="text-dark mx-2">Pearl
              Organisation</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
