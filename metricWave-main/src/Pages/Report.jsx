import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser';
import { BASE_URL } from '../utils/api';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Report = () => {


  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  // console.log ("sdvsdvdsvsdv",reports)
  useEffect(() => {
    fetch(`${BASE_URL}/reports`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setReports(data.reports);
      })
      .catch(err => console.error(err));
  }, []);

  // ============ Industry Menu Api ============

  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/industries`);
        const data = await response.json();
        // The API has "industries" key
        setIndustries(data.industries);
      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    };

    fetchIndustries();
  }, []);

  // ============ Industry Menu Api ============

  // ======================= Buy Now Url =====================

  const [type, setType] = useState('single-user')
  const handleSelect = async (e) => {
    setType(e.target.value)
  }
  const [customId, setCustomId] = useState('')
  useEffect(() => {
    const returnData = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/custom-buy-now-link/${reports[0]?.report_id}?type=single user}`)
        if (data?.success) {
          setCustomId(data?.reportId)
        }
      } catch (error) {
        return error
      }
    }

    returnData()
  }, [])

  // console.log("report_id", reports[0]?.report_id);
  // ======================= Buy Now Url =====================

  const handleBuyNow = () => {
    navigate(`/buy-now?id=${reports[0]?.report_id}&type=${type}`);
  };


   useEffect(() => {
        document.title = "Market Research Reports – MetricWave Insights";

        const metaDescription = document.querySelector("meta[name='description']");
        if (metaDescription) {
          metaDescription.setAttribute("content", "Browse and purchase industry-leading market research reports across diverse sectors.");
        } else {
          const meta = document.createElement('meta');
          meta.name = "description";
          meta.content = "Browse and purchase industry-leading market research reports across diverse sectors.";
          document.head.appendChild(meta);
        }
      }, []);

  return (
    <section className='my-5 ad_report'>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            { reports.map((report) => (
              <div className="report-card" key={report.id}>
                <div className="report-image">
                  <img
                    src="/Images/press_release_book.png"
                    alt={report.name}
                  />
                </div>
                <div className="report-details">
                  <Link to={`/${report.slug}`}><h2 className="report-title">{report.report_metas.keyword}</h2></Link>
                  <h5 className="report-desc desc_content">{parse(String(report?.name || ''))}</h5>
                  <div className="report-meta">
                    <span className="green">No. of Pages:</span> {report.page}
                    <span className="divider">|</span>
                    <span className="orange">Report Code:</span> {report.report_id}
                    <span className="divider">|</span>
                    <span className="price-label">Price:</span> ${report.sprice}
                  </div>
                  <div className="btn-group">
                    <Link to={`/request-details/${report.report_id}`} className="animated-btn text-decoration-none">
                      <i className="fas fa-download me-2"></i>
                      Request Free Sample
                    </Link>
                    {/* <Link  to="/buy-now"  className="animated-btn">
                    <i class="fa-solid fa-cart-shopping me-2"></i>
                    Buy Now
                  </Link> */}
                    <Button onClick={handleBuyNow} className="animated-btn bg_btn">
                      <i className="fa-solid fa-cart-shopping me-2"></i>BUY NOW <span>&rarr;</span>
                    </Button>
                  </div>
                </div>
                {/* <div className="report-options">
                <label>
                  <input type="radio" name={`plan_${report.id}`} />
                  Single User <strong>${report.dprice}</strong>
                </label>
                <label>
                  <input type="radio" name={`plan_${report.id}`} />
                  Multi User <strong>${report.mprice}</strong>
                </label>
                <label>
                  <input type="radio" name={`plan_${report.id}`} defaultChecked />
                  Enterprise User <strong>${report.cprice}</strong>
                </label>
                <button className="animated-btn bg_btn">
                  <i className="fas fa-shopping-cart me-2"></i>
                  BUY NOW
                </button>
              </div> */}
              </div>
            ))}
          </div>
          <div className="col-lg-3">
            <div className='request_ul_ad mb-4'>
              <div className="bg-primary text-white px-3 py-2">
                <h5 className='ad_main_head my-2 text-white'>All Categories</h5>
              </div>
              <ul className="list-group related-report-list">
                {industries.length > 0 ? industries.map(industry => (
                  <li key={industry.id} className='related-report-item'>
                    <Link className="industry_link" id={industry.id} to={`/industries/${industry.slug}`} >
                      {industry.name}
                    </Link>
                  </li>
                )) : (
                  <p>
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Report