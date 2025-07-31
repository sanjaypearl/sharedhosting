import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BASE_URL } from "../utils/api";

const SignUp = () => {

    const [formData, setFormData] = useState({
        email: '',
        mobile_no: '',
        address: '',
        password: '',
        name: ""
    });


    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message]);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${BASE_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("API Response:", data);

            if (data.errors) {
                const messages = Object.values(data.errors).flat().join(' ');
                setMessage(messages);
            } else {
                setMessage(data.message || 'Signup successful.');

                //  Reset the form 
                setFormData({
                    email: '',
                    mobile_no: '',
                    address: '',
                    password: '',
                    name: ''
                });
            }
        } catch (error) {
            console.error("Signup Error:", error.message);
            setMessage(error.message || "Signup failed.");
        }

        setLoading(false);
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
                <div class="contact-area style-two inner">
                    <div class="container">
                        <div class="row add-backgroun">
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
                            <div class="col-lg-7">
                                <form onSubmit={handleSubmit}>
                                    <div className="single-contact-form">
                                        <div className="contact-content">
                                            <h4>Signup</h4>
                                        </div>
                                        <div className="single-input-box">
                                            <input type="text" name="name" placeholder="Enter Your Name" value={formData.name} onChange={handleChange} required />
                                        </div>
                                        <div className="single-input-box">
                                            <input type="email" name="email" placeholder="Enter Your Email" value={formData.email} onChange={handleChange} required />
                                        </div>
                                        <div className="single-input-box">
                                            <input type="text" name="mobile_no" placeholder="Enter Your Phone Number" value={formData.mobile_no} onChange={handleChange} required />
                                        </div>
                                        <div className="single-input-box">
                                            <input type="text" name="address" placeholder="Enter Your Address" value={formData.address} onChange={handleChange} required />
                                        </div>
                                        <div className="single-input-box position-relative">
                                            <input type="password" name="password" placeholder="********" value={formData.password} onChange={handleChange} required />
                                        </div>

                                        <div className="d-flex align-items-center justify-content-between">
                                            <label>
                                                <input type="checkbox" defaultChecked name="remember" /> Remember me
                                            </label>
                                            <span className="psw">
                                                <Link to="/forgot-password" style={{ color: "#ff6600", textDecoration: "none" }}>
                                                    Forgot password?
                                                </Link>
                                            </span>
                                        </div>

                                        <div className="single-input-box">
                                            <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Signup'}</button>
                                        </div>

                                        <span className="psw text-white">
                                            Already have an Account? <Link to="/login" style={{ color: "#ff6600", textDecoration: "none" }}>Login</Link>
                                        </span>

                                        {message && (
                                            <div class="alert alert-success" role="alert">
                                                {message}
                                            </div>
                                        )}
                                    </div>
                                </form>
                                <div className="login_link_grp">
                                    <Link to="/terms-and-condition">Term & Conditions</Link>
                                    <Link to="/privacy-policies">Privacy Policy</Link>
                                    <Link to="/gdpr-policies">Cookie Policy</Link>
                                </div>
                                <div id="status"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUp