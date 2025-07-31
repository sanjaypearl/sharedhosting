import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser';
import SampleRequestForm from '../Component/Sample_request_form';
import { BASE_URL } from '../utils/api';
import { Button } from 'react-bootstrap';

function RequestPage() {
  const { reportId } = useParams();
  const location = useLocation();
  const [reportData, setReportData] = useState(null);
  const [relatedReports, setRelatedReports] = useState([]);
  const navigate = useNavigate();

  // Determine formType from pathname
  const path = location.pathname;
  let heading = "Ask for Discount";
  if (path.includes('/inquiry')) heading = "Inquire Before Buy";
  else if (path.includes('/customization')) heading = "Ask for Customization";

  useEffect(() => {
    fetch(`${BASE_URL}/reports`)
      .then((res) => res.json())
      .then((data) => setRelatedReports(data.reports || []))
      .catch((err) => console.error("Error fetching related reports:", err));
  }, []);

  useEffect(() => {
    if (reportId) {
      axios.get(`${BASE_URL}/report-request-sample/${reportId}`)
        .then(res => setReportData(res.data.report))
        .catch(err => console.error('Failed to fetch report data:', err));
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

  if (!reportData) return <p className='text-center py-5'>Loading report...</p>;

  return (
    <section className='ad_request-details'>
      <div className="container my-4">
        <div className="row">
          <div className="d-flex page_breadcrumbs">
            <Link to="/"><i className='fa-solid fa-house'></i> /</Link>
            <Link to={`/industries/${reportData.industry_slug}`} className="">{reportData.industry} /</Link>
            <p className='breadcrumb_data'>{reportData.report_metas.keyword.split(" ").slice(0, 10).join(" ")}</p>
          </div>

          <div className="co-12 mt-5">
            <div className="row">
              {/* Left Section */}
              <div className="col-xl-9 col-lg-8">
                <div className="compost-card text-white mb-4">
                  <Link to={`/${reportData.slug}`}><h1 className="fw-bold">{reportData.industry}</h1></Link>
                  <h3 className="mb-4 summary-clamp">{parse(reportData.name)}</h3>
                  <div className="badge-box px-4 py-2 rounded-pill text-white fw-semibold">
                    {reportData.industry} | Pages: {reportData.page} | Report ID: {reportData.report_id}
                    | Format:
                    <div className="format_grp">
                      <img src="https://cdn-icons-png.flaticon.com/128/136/136522.png" alt="" />
                      <img src="https://cdn-icons-png.flaticon.com/128/15465/15465638.png" alt="" />
                    </div>
                  </div>
                </div>
                <div className='_discount_div'>
                  <SampleRequestForm heading={heading} type="2" report_id={reportData?.id} />
                </div>
              </div>

              {/* Right Section */}
              <div className="col-xl-3 col-lg-4">
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
                  <Link to={`/discount/${reportData.report_id}`} className="animated-btn text-center bg_btn w-100"><img src="https://cdn-icons-png.flaticon.com/128/2652/2652181.png" alt="" />Ask For Discount</Link>
                  <Link to={`/inquiry/${reportData.report_id}`} className="animated-btn text-center w-100 mt-2 enquiry_btn"><img src="https://cdn-icons-png.flaticon.com/128/942/942802.png" alt="" />Enquiry Before Buy</Link>
                  <Link to={`/customization/${reportData.report_id}`} className="animated-btn text-center w-100 mt-2 customize_btn"><img src="https://cdn-icons-png.flaticon.com/128/5063/5063916.png" alt="" />Ask For Customization</Link>
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
                    {relatedReports.slice(0, 5).map((report) => (
                      <li className="related-report-item" key={report.id}>
                        <Link to={`/${report.slug}`}>
                          <p>{report.report_metas.keyword.length > 80 ? report.report_metas.keyword.substring(0, 80) + "..." : report.report_metas.keyword}</p>
                        </Link>
                      </li>
                    ))}
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

export default RequestPage;
