import React, { useEffect, useState, useRef } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import SampleRequestForm from '../Component/Sample_request_form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { BASE_URL } from '../utils/api';
import { Form, Alert } from "react-bootstrap";

function ReportDetail() {
    const { slug } = useParams();
    const [reportData, setReportData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation()
    const industrySlug = location?.state?.slug ?? ""

    // ======================= All reports =====================

    const [relatedReports, setRelatedReports] = useState([]);

    const [showModal, setShowModal] = useState(false);
     const currentUrl = `https://www.metricwaveinsights.com${location.pathname}`;

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    const handleCloseModal = () => setShowModal(false);




    const [formData, setFormData] = useState({
        name: '',
        email: '',
        // subject: '',
        message: '',
        mobile_no: '',
        company_name: '',
        privacy_policy: false,
    });
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const turnstileRef = useRef(null); 
    const [captchaToken, setCaptchaToken] = useState("");
    const [countryList, setCountryList] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/reports`)
            .then(response => response.json())
            .then(data => {
                if (data && data.reports) {
                    setRelatedReports(data.reports);
                }
            })
            .catch(error => console.error('Error fetching related reports:', error));
    }, []);

    // ======================= All reports =====================

    useEffect(() => {
        if (slug) {
            axios.get(`${BASE_URL}/reports-detail/${slug}`)
                .then(res => {
                    setReportData(res.data);
                })
                .catch(err => {
                    console.error("Failed to fetch report details:", err);
                });
        }
    }, [slug]);


   useEffect(() => {
    if (reportData?.report?.report_metas) {
      const meta = reportData?.report?.report_metas;
        console.log("Report Data:",meta);
      document.title = meta?.meta_title || 'Default Title';

      let metaDescription = document.querySelector("meta[name='description']");
      if (metaDescription) {
        metaDescription.setAttribute("content", meta.meta_desccription || '');
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        metaDescription.content = meta.meta_desccription || '';
        document.head.appendChild(metaDescription);
      }

      let metaKeywords = document.querySelector("meta[name='keywords']");
      if (metaKeywords) {
        metaKeywords.setAttribute("content", meta.meta_keyword || '');
      } else if (meta.meta_keyword) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        metaKeywords.content = meta.meta_keyword;
        document.head.appendChild(metaKeywords);
    }
}
}, [reportData]);



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
        }, 300); 

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

            if (response.ok && result.success) {
                setSuccess(result.message);
                navigate("/thank-you", { state: { from: location.pathname } });
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

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/country-with-phone-code`
                );
                const data = await response.json();
                if (data?.countrys) {
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


    // ======================= Buy Now Url =====================

    const [type, setType] = useState('single-user')
    const handleSelect = async (e) => {
        setType(e.target.value)
    }
    const [customId, setCustomId] = useState('')
    useEffect(() => {
        const returnData = async () => {
            try {
                const { data } = await axios.get(`https://metricwaveinsights.com/admin/api/custom-buy-now-link/${reportData?.report?.report_id}`)
                
                if (data?.success) {
                    setCustomId(data?.reportId)
                }
            } catch (error) {
                return error
            }
        }

        returnData()
    }, [reportData?.report])
    console.log("the custom id", reportData)

    // ======================= Buy Now Url =====================

    const handleBuyNow = () => {
        navigate(`/buy-now?id=${customId}&type=${type}`);
    };
    
    if (!reportData) return <p className="text-center my-5">Loading Report Details...</p>;



    return (
        <>
            <section className='ad_request-details'>
                <div className="container my-4">
                    <div className="row">
                        <div className="d-flex justify-content-between align-items-center">
                            {/* Breadcrumbs */}
                            <div className="d-flex page_breadcrumbs">
                                <Link to="/" className=""><i className='fa-solid fa-house'></i> /</Link>
                                <Link to={`/industries/${reportData.report.industry_info.slug}`} className="">{reportData.report.industry} /</Link>
                                <p className='breadcrumb_data'>
                                    {reportData ? reportData.report.report_metas.keyword.split(" ").slice(0, 10).join(" ") : 'Loading...'}
                                </p>
                            </div>
                            <div className="share_report">
                                <h5>Share:</h5>
                               <Link
                                    to={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa-brands fa-linkedin"></i>
                                </Link>

                                {/* Twitter/X Share */}
                                <Link
                                    to={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent('Check out this report!')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa-brands fa-square-x-twitter"></i>
                                </Link>
                            </div>
                        </div>


                        <div className="co-12 mt-5">
                            <div className="row">
                                <div className="col-xl-9 col-lg-8">
                                    <div className="compost-card text-white mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h1 className="fw-bold">{reportData.report.report_metas.keyword}</h1>
                                            {/* <Link class="animated-btn" to={`/request-details/${reportData.report.report_id}`}><i class="fas fa-download me-2"></i>Request Free Sample</Link> */}
                                        </div>
                                        <h3 className="mb-4">
                                            {parse(reportData.report.name)}
                                        </h3>
                                        <div className="badge-box px-4 py-2 rounded-pill text-white fw-semibold">
                                            {reportData.report.industry} | Report ID: {reportData.report.report_id} | Pages: {reportData.report.page} | Format: <div className="format_grp"><img src="https://cdn-icons-png.flaticon.com/128/136/136522.png" alt="" /><img src="https://cdn-icons-png.flaticon.com/128/15465/15465638.png" alt="" /></div>
                                        </div>
                                    </div>

                                    {/* Tabs */}
                                    <div className='_discount_div'>
                                        <ul className="nav custom-tab-buttons mb-5" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link active" id="desc-tab" data-toggle="tab" href="#description" role="tab">Report Description</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="toc-tab" data-toggle="tab" href="#toc" role="tab">Table of Content</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="method-tab" data-toggle="tab" href="#methodology" role="tab">Segmentation</a>
                                            </li>
                                            <Link to={`/sample/${reportData.report.report_id}`} className="btn custom-download-btn">DOWNLOAD SAMPLE <i className="fas fa-download ml-1"></i></Link>
                                        </ul>

                                        <div className="tab-content border-left border-right border-bottom p-3" id="myTabContent">
                                            <div className="tab-pane fade show active" id="description" role="tabpanel">
                                                <h5>{parse(reportData.report.summary)}</h5>
                                                <p>
                                                    {typeof reportData?.report?.taf === 'string' && reportData.report.summary.trim() !== ''
                                                        ? parse(reportData.report.summary)
                                                        : null}
                                                </p>
                                            </div>

                                            <div className="tab-pane fade" id="toc" role="tabpanel">
                                                <SampleRequestForm heading="Request form TOC" />
                                            </div>

                                            <div className="tab-pane fade" id="methodology" role="tabpanel">
                                                <h5>Segmentation</h5>
                                                <p>
                                                    {typeof reportData?.report?.taf === 'string' && reportData.report.taf.trim() !== ''
                                                        ? parse(reportData.report.taf)
                                                        : null}
                                                </p>
                                            </div>
                                        </div>
                                        {reportData?.faq?.length > 0 && (
                                            <section className="py-5">
                                                <div className="container">
                                                    <h4 className="mb-4">Frequently Asked Questions</h4>
                                                    <div className="faq_container">
                                                        <Accordion defaultActiveKey="0">
                                                            {reportData.faq.map((item, index) => (
                                                                <Accordion.Item eventKey={index.toString()} key={item.id} className="mb-3">
                                                                    <Accordion.Header>{item.qus}</Accordion.Header>
                                                                    <Accordion.Body className="text-muted">
                                                                        {item.ans}
                                                                    </Accordion.Body>
                                                                </Accordion.Item>
                                                            ))}
                                                        </Accordion>
                                                    </div>
                                                </div>
                                            </section>
                                        )}

                                    </div>
                                    <div class="aboutAuther mt-3">
                                        <div class="card-header card-title aboutAuthor-card">
                                            <p class="snapshots-head font-17 fontW-600 mb-0">About Author</p>
                                        </div>
                                        <div class="paragraph_content mt-3 pt-1">
                                            <p><strong><Link to="#">{parse(reportData.report.author_name)}</Link></strong> </p>
                                        </div>
                                    </div>
                                </div>


                                {/* Right Side Panel */}
                                <div className="col-xl-3 col-lg-4">
                                    <div className="request-form-box mb-4 pt-0">
                                        <h5 className="ad_main_head">Choose a Licence Type</h5>
                                        <form>
                                            <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="license"
                                                    id="single"
                                                    value="single-user"
                                                    defaultChecked
                                                    onChange={handleSelect}
                                                />
                                                <label className="form-check-label" htmlFor="single">
                                                    Single User License <strong>${reportData.report.sprice}</strong>
                                                </label>
                                            </div>

                                            <hr />

                                            <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="license"
                                                    id="multi"
                                                    value="multiple-user"
                                                    onChange={handleSelect}
                                                />
                                                <label className="form-check-label" htmlFor="multi">
                                                    Multiple User License <strong>${reportData.report.mprice}</strong>
                                                </label>
                                            </div>

                                            <hr />

                                            <div className="form-check mb-4">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="license"
                                                    id="corporate"
                                                    value="corporate-user"
                                                    onChange={handleSelect}
                                                />
                                                <label className="form-check-label" htmlFor="corporate">
                                                    Corporate User License <strong>${reportData.report.cprice}</strong>
                                                </label>
                                            </div>

                                            <hr />

                                            <Button onClick={handleBuyNow} className="animated-btn bg_btn">
                                                <i className="fa-solid fa-cart-shopping me-2"></i>BUY NOW <span>&rarr;</span>
                                            </Button>
                                        </form>
                                    </div>

                                    <div className='_discount_div mb-4'>
                                        <Link to={`/discount/${reportData.report.report_id}`} className="animated-btn text-center bg_btn main_cat_btn"><img src="https://cdn-icons-png.flaticon.com/128/2652/2652181.png" alt="" />Ask For Discount</Link>
                                        <Link to={`/inquiry/${reportData.report.report_id}`} className="animated-btn text-center main_cat_btn mt-2 enquiry_btn"><img src="https://cdn-icons-png.flaticon.com/128/942/942802.png" alt="" /> Enquiry Before Buy</Link>
                                        <Link to={`/customization/${reportData.report.report_id}`} className="animated-btn text-center main_cat_btn mt-2 customize_btn"><img src="https://cdn-icons-png.flaticon.com/128/5063/5063916.png" alt="" /> Ask For Customization</Link>
                                    </div>

                                    <div class="request_ul_ad mb-4">
                                        <div class="bg-primary text-white px-3 py-2">
                                            <h5 class="ad_main_head my-2 text-white">Payment Method</h5>
                                        </div>
                                        <div class="order_summary_card payment_method">
                                            <img class="w-100" alt="payment" src="/Images/payment_card.webp" />
                                        </div>
                                    </div>

                                    <div className='request_ul_ad mb-4'>
                                        <div className="bg-primary text-white px-3 py-2">
                                            <h5 className='ad_main_head my-2 text-white'>Related Reports</h5>
                                        </div>
                                        <ul className="list-group related-report-list">
                                            {relatedReports.length > 0 ? (
                                                relatedReports.slice(0, 5).map((report) => (
                                                    <li className="related-report-item" key={report.id}>
                                                        <Link to={`/${report.slug}`}>
                                                            <p>
                                                                {report.report_metas.keyword.length > 80
                                                                    ? report.report_metas.keyword.substring(0, 80) + "..."
                                                                    : report.report_metas.keyword}
                                                            </p>
                                                        </Link>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="related-report-item">
                                                    <p>Loading related reports...</p>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="bottom-bar">
                    <div className="container d-flex gap-3 align-items-center">
                        <h3 className="">Need this report? Grab it now!</h3>
                        <Link class="animated-btn" to={`/request-details/${reportData.report.report_id}`}><i class="fas fa-download me-2"></i>Request Free Sample</Link>
                    </div>
                </div>
            </section>

            <Modal show={showModal} onHide={handleCloseModal} centered className='enquiry_main_modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Available PDF Sample Reports</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                        className="border-secondary form-select"
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


                        <Button variant="warning" type="submit" className="animated-btn" disabled={loading}>
                            {loading ? "Sending..." : "SEND MESSAGE"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>

    );
}

export default ReportDetail;
