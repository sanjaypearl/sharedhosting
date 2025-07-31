import React, { useEffect, useState } from 'react';
import { Link, useParams , useNavigate , useLocation } from 'react-router-dom';
import SampleRequestForm from '../Component/Sample_request_form';
import axios from 'axios';
import parse from 'html-react-parser';
import { BASE_URL } from '../utils/api';
import {Button} from 'react-bootstrap'

function DownlaodSample() {
    const { reportId } = useParams();
    const [reportData, setReportData] = useState(null);
    const [relatedReports, setRelatedReports] = useState([]);
    const navigate = useNavigate();
     const location = useLocation()

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
    useEffect(() => {
        if (reportId) {
            axios.get(`${BASE_URL}/report-request-sample/${reportId}`)
                .then(res => {
                    setReportData(res.data.report);
                })
                .catch(err => {
                    console.error('Failed to fetch report data:', err);
                });
        }
    }, [reportId]);

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
                    `https://metricwaveinsights.com/admin/api/custom-buy-now-link/${relatedReports[0]?.report_id}`
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

    console.log("The custom id:", customId ,type);
    console.log("Related Report ID:", relatedReports[0]?.report_id);
    
    
        // ======================= Buy Now Url =====================
    
        const handleBuyNow = () => {
            navigate(`/buy-now?id=${customId}&type=${type}`);
        };

    if (!reportData) return <p className='text-center py-5'>Loading report...</p>;

   

    return (
        <section className='ad_request-details'>
            <div className="container my-4">
                <div className="row">
                    {/* Breadcrumb */}
                    <div className="d-flex page_breadcrumbs">
                        <Link to="/" className="">Home /</Link>
                        <Link to={`/industries/${reportData.industry_slug}`} className="">{reportData.industry} /</Link>
                        <p className='breadcrumb_data'>
                            {reportData ? reportData.name.split(" ").slice(0, 10).join(" ") : 'Loading...'}
                        </p>
                    </div>

                    <div className="co-12 mt-5">
                        <div className="row">
                            {/* Left Section */}
                            <div className="col-lg-9">
                                <div className="compost-card text-white mb-4">
                                    <h1 className="fw-bold">{reportData.report_metas.keyword}</h1>
                                    <h3 className="mb-4 summary-clamp">{parse(reportData.name)}</h3>
                                    <div className="badge-box px-4 py-2 rounded-pill text-white fw-semibold">
                                        Industry: {reportData.industry} | Pages: {reportData.page} | Report ID: {reportData.report_id} | Format: <div className="format_grp"><img src="https://cdn-icons-png.flaticon.com/128/136/136522.png" alt="" /><img src="https://cdn-icons-png.flaticon.com/128/15465/15465638.png" alt="" /></div>
                                    </div>
                                </div>
                                <div className='_discount_div'>
                                    <SampleRequestForm heading="Request Free Sample Report" type="1" report_id={reportData?.id} />
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="col-lg-3">
                                <div className="request-form-box mb-4 pt-0">
                                    <h5 className="ad_main_head">Choose a Licence Type</h5>
                                    <form>
                                        <div className="form-check mb-3">
                                            <input className="form-check-input" type="radio" name="license" id="single" defaultChecked />
                                            <label className="form-check-label" htmlFor="single">
                                                Single User License <strong>${reportData.sprice}</strong>
                                            </label>
                                        </div>
                                        <hr />
                                        <div className="form-check mb-3">
                                            <input className="form-check-input" type="radio" name="license" id="multi" />
                                            <label className="form-check-label" htmlFor="multi">
                                                Multiple User License <strong>${reportData.mprice}</strong>
                                            </label>
                                        </div>
                                        <hr />
                                        <div className="form-check mb-4">
                                            <input className="form-check-input" type="radio" name="license" id="corporate" />
                                            <label className="form-check-label" htmlFor="corporate">
                                                Corporate User License <strong>${reportData.cprice}</strong>
                                            </label>
                                        </div>
                                        <hr />
                                        <Button onClick={handleBuyNow} className="animated-btn bg_btn">
                                                <i className="fa-solid fa-cart-shopping me-2"></i>BUY NOW <span>&rarr;</span>
                                            </Button>
                                    </form>
                                </div>



                                <div className='_discount_div mb-4'>
                                    <img className='w-100' src="/images/pay.webp" alt="payment" />
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
                                                            {report.name.length > 80
                                                                ? report.name.substring(0, 80) + "..."
                                                                : report.name}
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
    );
}

export default DownlaodSample;
