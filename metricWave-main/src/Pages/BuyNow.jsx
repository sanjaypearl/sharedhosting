import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from 'axios';
import { BASE_URL } from '../utils/api';

const BuyNow = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);
    //  const params = useParams()
    const [searchParams] = useSearchParams()
    const reportId = searchParams.get("id");
    const reportType = searchParams.get("type");
    const [successPayment , setSuccessPayment] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState('card');



    useEffect(() => {
        const fetchBuyNowData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/custom-buy-now-link/${reportId}`);
                const result = await response.json();
                if (response.ok && result.success) {
                    setData(result);
                } else {
                    throw new Error(result?.message || "Something went wrong");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBuyNowData();
    }, [reportId]);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/country-with-phone-code`)
            .then((res) => {
                if (res.data?.countrys) {
                    setCountries(res.data.countrys);
                }
            })
            .catch((err) => console.error("Failed to fetch countries:", err));
    }, []);


    const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    company_name: '',
    title: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    report_id: '',
    policy: false,
});
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

 
const checkoutHandleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.policy) {
        alert("Please accept the Terms & Conditions.");
        return;
    }

    setLoading(true);

    try {
        const payload = {
            name: formData.name,
            email: formData.email,
            mobile_no: formData.mobile_no,
            company_name: formData.company_name,
            title: formData.title,
            country: formData.country,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            report_id: data?.reportId,
            amount: data?.price, 
        };

        const response = await axios.post(`${BASE_URL}/paypal/create-order`, payload);

        if (response.data?.approval_url) {
            window.location.href = response.data.approval_url;
        } else {
            alert("Failed to initiate PayPal checkout");
        }
    } catch (err) {
        console.error("Checkout error:", err);
        alert("Error during checkout. Please try again.");
    } finally {
        setLoading(false);
    }
};

const paymentHandleChange = (e) => {
    setSelectedMethod(e.target.value);
  };

    return (
        <section className='ad_request-details'>
            <div className="container my-4">
                <div className="row">
                    <div className="d-flex page_breadcrumbs">
                        <Link to="/"><i className='fa-solid fa-house'></i> /</Link>
                        <Link to={`/industries/${data?.industrySlug || ''}`}>
                            {data?.category || "Manufacturing And Construction"} /
                        </Link>
                        <p className="breadcrumb_data">
                            {data?.reportName
                                ? data?.reportMetas?.keyword.split(" ").slice(0, 10).join(" ") + ""
                                : "Loading..."}
                        </p>
                    </div>

                    <div className="col-12 mt-5">
                        {loading ? (
                            <div className="text-center w-100 py-5">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        ) : error ? (
                            <Alert variant="danger">{error}</Alert>
                        ) : (
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="contact-form">
                                        <h3 className="text-uppercase fw-bold mb-4 text-center">
                                            Billing Information
                                        </h3>

                                        {/* {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>} */}

                                        <Form onSubmit={checkoutHandleSubmit} encType="multipart/form-data">
                                            <div className="row">
                                                <div className="col-md-6">
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
                                                    <Form.Group controlId="formTitle" className="mb-3">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Job Title / Designation / Position"
                                                            name="title"
                                                            value={formData.title}
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
                                                    <Form.Group controlId="formAddress" className="mb-3">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter Your Address"
                                                            name="address"
                                                            value={formData.address}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Group controlId="formCity" className="mb-3">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter Your City"
                                                            name="city"
                                                            value={formData.city}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className="col-md-6">
                                                    <Form.Group controlId="formState" className="mb-3">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter Your State"
                                                            name="state"
                                                            value={formData.state}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className="col-md-12">
                                                    <Form.Group controlId="formZip" className="mb-3">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter Your Zip Code / Postal Code"
                                                            name="zip"
                                                            value={formData.zip}
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
                                                            onChange={(e) =>
                                                                setFormData({ ...formData, policy: e.target.checked })
                                                            }
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

                                            {/* <div className="mb-3">
                                            <div ref={turnstileRef} className="cf-turnstile d-flex" />
                                        </div> */}

                                            <Button
                                                variant="warning"
                                                type="submit"
                                                className="text-white w-100"
                                                disabled={loading}
                                            >
                                                {loading ? 'Processing...' : 'Secure Checkout'}
                                            </Button>
                                        </Form>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className='request_ul_ad mb-4'>
                                        <div className="bg-primary text-white px-3 py-2">
                                            <h5 className='ad_main_head my-2 text-white'>Order Summary</h5>
                                        </div>
                                        <div className="order_summary_card">
                                            <img src="/Images/press_release_book.webp" alt="" />
                                            <div className="order_summary_content">
                                                <h5>{data?.reportMetas?.keyword}</h5>
                                                <ul>
                                                    <li>
                                                        <span><strong>Delivery Format: </strong></span>
                                                        <span>PDF / EXCEL</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>Category: </strong></span>
                                                        <span>{data?.category}</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>Pages: </strong></span>
                                                        <span>{data?.link?.page}</span>
                                                    </li>
                                                </ul>
                                                <h3>${data?.price}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='request_ul_ad mb-4'>
                                    <div className="bg-primary text-white px-3 py-2">
                                        <h5 className='ad_main_head my-2 text-white'>Payment Method</h5>
                                    </div>

                                    <div className="order_summary_card payment_method">
                                        <div className="payment_check_method">
                                        <div className="payment_item via_card">
                                            <label className="d-flex align-items-center">
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                value="card"
                                                checked={selectedMethod === 'card'}
                                                onChange={paymentHandleChange}
                                                className="me-2"
                                            />
                                            <h5 className="m-0">Credit/Debit Card</h5>
                                            </label>
                                        </div>

                                        <div className="payment_item via_bank">
                                            <label className="d-flex align-items-center">
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                value="bank"
                                                checked={selectedMethod === 'bank'}
                                                onChange={paymentHandleChange}
                                                className="me-2"
                                            />
                                            <h5 className="m-0">Bank Wire Transfer</h5>
                                            </label>
                                        </div>
                                        </div>

                                        <div className="mt-4">
                                        {selectedMethod === 'card' && (
                                            <Link to="/">
                                            <img className='w-100' src="/Images/paypal.webp" alt="Card Payment" />
                                            </Link>
                                        )}
                                        {selectedMethod === 'bank' && (
                                            <Link to="/">
                                            <img className='w-100' src="https://cdn-icons-png.flaticon.com/128/38/38978.png" alt="Bank Transfer" />
                                            </Link>
                                        )}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BuyNow