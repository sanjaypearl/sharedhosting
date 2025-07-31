import React, { useState, useEffect, useRef } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/api'; 

const SampleRequestForm = ({ report_id, heading, type }) => {

    const turnstileRef = useRef(null); // Ref for Turnstile container
    const [captchaToken, setCaptchaToken] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country: '',
        mobile_no: '',
        company_name: '',
        message: '',
        report_id: report_id,
        type: type || "1", // default to 1 if not passed
    });

    // console.log("the formdata is", formData)
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [countryList, setCountryList] = useState([]);
    // console.log("the country list", countryList)


    useEffect(() => {
        // Load Turnstile script only once
        if (!document.getElementById('cf-turnstile-script')) {
            const script = document.createElement('script');
            script.id = 'cf-turnstile-script';
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        }

        // Poll to check if window.turnstile is available
        const interval = setInterval(() => {
            if (window.turnstile && turnstileRef.current) {
                window.turnstile.render(turnstileRef.current, {
                    sitekey: '0x4AAAAAABlc_TZZ-c0n_W5R',  // <-- REPLACE with your actual site key
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
                    }
                });
                clearInterval(interval);
            }
        }, 300);

        return () => clearInterval(interval);
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');

        // Validate captcha token BEFORE submitting
        if (!captchaToken) {
            setErrors({ captcha: 'Please complete the CAPTCHA.' });
            return;  // Do NOT proceed if captcha token missing
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${BASE_URL}/sample-report-request`,
                {
                    ...formData,
                    report_id,
                    type: type || "1",
                    turnstile_token: captchaToken,  // send captcha token to backend
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const data = response.data;
            if (data.success) {
                setSuccessMessage('Your request has been submitted successfully.');
                setFormData({
                    name: '',
                    email: '',
                    country: '',
                    mobile_no: '',
                    company_name: '',
                    message: '',
                    report_id,
                    type: type || "1",
                });
                setCaptchaToken('');

                // Reset Turnstile widget manually if possible
                if (window.turnstile && turnstileRef.current) {
                    window.turnstile.reset(turnstileRef.current);
                }
            } else {
                setErrors(data.errors || {});
            }
        } catch (error) {
            setErrors({ general: 'Something went wrong. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(`${BASE_URL}/country-with-phone-code`);
                const data = await response.json();
                if (data?.countrys) {
                    setCountryList(data.countrys);
                }
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        // Update form state if report_id or type changes
        setFormData(prev => ({
            ...prev,
            report_id: report_id,
            type: type || "1"
        }));
    }, [report_id, type]);

    return (
        <div className="request-form-box mb-4 pt-0">
            <h4 className="ad_main_head text-center">{heading}</h4>

            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errors.general && <Alert variant="danger">{errors.general}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                    <Col md={6}>
                        <Form.Group controlId="formName">
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name?.[0]}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formEmail">
                            <Form.Control
                                type="email"
                                placeholder="Business Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email?.[0]}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formCountryCode">
                            <Form.Select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                isInvalid={!!errors.country}
                            >
                                <option value="">Select Country Code</option>
                                {[...countryList]
                                    .sort((a, b) => a.phonecode - b.phonecode)
                                    .map((country) => (
                                        <option key={country.id} value={`+${country.phonecode}`}>
                                            {country.name} (+{country.phonecode})
                                        </option>
                                    ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.country?.[0]}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formPhone">
                            <Form.Control
                                type="tel"
                                placeholder="Phone Number"
                                name="mobile_no"
                                value={formData.mobile_no}
                                onChange={handleChange}
                                isInvalid={!!errors.mobile_no}
                            />
                            <Form.Control.Feedback type="invalid">{errors.mobile_no?.[0]}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={12}>
                        <Form.Group controlId="formCompany">
                            <Form.Control
                                type="text"
                                placeholder="Company Name.."
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                                isInvalid={!!errors.company_name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.company_name?.[0]}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={12}>
                        <Form.Group controlId="formMessage">
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                isInvalid={!!errors.message}
                            />
                            <Form.Control.Feedback type="invalid">{errors.message?.[0]}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={12} className="mt-3">
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <Form.Check
                                type="checkbox"
                                id="privacyCheck"
                                defaultChecked
                                label={
                                    <>
                                        Yes, I have read the{' '}
                                        <Link to="/privacy-policies" className="animated-underline">privacy policy</Link>
                                    </>
                                }
                            />
                            <div ref={turnstileRef} className="cf-turnstile" />
                            {errors.captcha && <div className="text-danger mt-2">{errors.captcha}</div>
                            }

                            <Button type="submit" className="main_btn m-0" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Request'}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default SampleRequestForm;
