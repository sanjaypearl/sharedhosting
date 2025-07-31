import React, { useEffect, useState } from 'react';
import { data, Link } from 'react-router-dom';
import parse from 'html-react-parser'
import { useLocation , useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Sample_request_form from '../Component/Sample_request_form';
import { BASE_URL } from '../utils/api';
import {Button } from 'react-bootstrap';
import axios from 'axios';

function Request_Details() {
    const { slug } = useParams();
    const [reportData, setReportData] = useState(null);
    const [industries, setIndustries] = useState([]);
    const navigate = useNavigate();

    // console.log("the slug is", industries?.[0]?.slug);
    useEffect(() => {
        // Fetch Report Data
        fetch(`${BASE_URL}/report-request-sample/${slug}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.report) {
                    setReportData(data.report);
                }
            })
            .catch(error => console.error('Error fetching report data:', error));
            console.log("feevev",data)

        // Fetch Industry Data
        fetch(`${BASE_URL}/industries`)
            .then(response => response.json())
            .then(data => {
                if (data && data.industries) {
                    setIndustries(data.industries);
                }
            })
            .catch(error => console.error('Error fetching industries:', error));
    }, [slug]);

    // Find Industry Name by ID
    const getIndustryName = (industryId) => {
        const industry = industries.find(ind => ind.id === industryId);
        return industry ? industry.name : 'Loading...';
    };


    // ======================= All reports =====================


    const [relatedReports, setRelatedReports] = useState([]);

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

    // ======================= Buy Now Url =====================
    
        const [type, setType] = useState('single-user');
        const handleSelect = async (e) => {
            setType(e.target.value);
        };

        const [customId, setCustomId] = useState('');
        const [loading, setLoading] = useState(true); 
        const [error, setError] = useState(null); 

        useEffect(() => {
            const returnData = async () => {
                if (!relatedReports || !relatedReports[0]?.report_id) {
                    setError("No report ID available");
                    setLoading(false);
                    return;
                }

                try {
                    const { data } = await axios.get(
                        `${BASE_URL}/custom-buy-now-link/${relatedReports[0]?.report_id}`
                    );
                    
                    if (data?.success) {
                        setCustomId(data?.reportId);
                    } else {
                        setError("Failed to fetch data");
                    }
                } catch (err) {
                    setError("Error fetching data");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            returnData();
        }, [relatedReports]); 

        // console.log("The custom id:", customId ,type);
        // console.log("Related Report ID:", reportData.industry_slug,reportData.industry);
    
    
        // ======================= Buy Now Url =====================
    
        const handleBuyNow = () => {
            navigate(`/buy-now?id=${customId}&type=${type}`);
        };

    return (
        <section className='ad_request-details'>
            <div className="container my-4">
                <div className="row">
                    <div className="d-flex page_breadcrumbs">
                        <Link to="/" className=""><i class="fa-solid fa-house"></i> /</Link>
                       {reportData?.industry_slug && (
                            <Link to={`/industries/${reportData.industry_slug}`} className="">
                                {reportData.industry} /
                            </Link>
                        )}
                        <p className='breadcrumb_data'>
                            {reportData ? reportData.report_metas.keyword.split(" ").slice(0, 10).join(" ") : 'Loading...'}
                        </p>
                    </div>

                    <div className="co-12 mt-5">
                        <div className="row">
                            <div className="col-lg-8">
                                {reportData ? (
                                <>
                                    <div className="compost-card text-white mb-4">
                                         <Link to={`/${reportData.slug}`}><h1 className="fw-bold">{reportData?.report_metas?.keyword}</h1></Link>
                                        <h3 className="mb-4 summary-clamp">
                                            {typeof reportData?.name === 'string' ? parse(reportData.name) : 'Loading...'}
                                        </h3>
                                        <div className="badge-box px-4 py-2 rounded-pill text-white fw-semibold">
                                            {reportData.industry} | Pages: {reportData.page} | Report ID: {reportData.report_id} | Format:
                                            <div className="format_grp">
                                            <img src="https://cdn-icons-png.flaticon.com/128/136/136522.png" alt="" />
                                            <img src="https://cdn-icons-png.flaticon.com/128/15465/15465638.png" alt="" />
                                            </div>
                                        </div>
                                    </div>

                                    <Sample_request_form report_id={reportData?.id} heading="Request Free Sample Report" />
                                </>
                                ) : (
                                <p className="text-white">Loading report details...</p>
                                )}
                            </div>

                            <div className="col-lg-4">
                                <div className="request-form-box mb-4 pt-0">
                                    <h5 className="ad_main_head">Choose a Licence Type</h5>
                                    <form>
                                        <div className="form-check mb-3">
                                            <input className="form-check-input" type="radio" name="license" id="single" defaultChecked />
                                            <label className="form-check-label" htmlFor="single">
                                                Single User License <strong>${reportData ? reportData.dprice : '...'}</strong>
                                            </label>
                                        </div>
                                        <hr />
                                        <div className="form-check mb-3">
                                            <input className="form-check-input" type="radio" name="license" id="multi" />
                                            <label className="form-check-label" htmlFor="multi">
                                                Multiple User License <strong>${reportData ? reportData.mprice : '...'}</strong>
                                            </label>
                                        </div>
                                        <hr />
                                        <div className="form-check mb-4">
                                            <input className="form-check-input" type="radio" name="license" id="corporate" />
                                            <label className="form-check-label" htmlFor="corporate">
                                                Corporate User License <strong>${reportData ? reportData.cprice : '...'}</strong>
                                            </label>
                                        </div>
                                        <hr />
                                        <Button onClick={handleBuyNow} className="animated-btn bg_btn">
                                                <i className="fa-solid fa-cart-shopping me-2"></i>BUY NOW <span>&rarr;</span>
                                            </Button>
                                    </form>
                                </div>

                                <div className="request_ul_ad mb-4">
                                    <div className="bg-primary text-white px-3 py-2">
                                        <h5 className="ad_main_head my-2 text-white">Payment Method</h5>
                                    </div>
                                    <div className="order_summary_card payment_method">
                                        <img className="w-100" alt="payment" src="/Images/payment_card.webp" />
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
        </section>
    )
}

export default Request_Details;
