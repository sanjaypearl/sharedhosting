import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { BASE_URL } from '../utils/api';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Industry_Details = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('single-user');
   const [customId, setCustomId] = useState('')

  // Fetch industries list
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/industries`);
        const data = await response.json();
        setIndustries(data.industries || []);
      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    };
    fetchIndustries();
  }, []);

  // Fetch Industry Meta Titles and Descriptions
const [meta, setMeta] = useState()
  useEffect(() => {
    if (industries.length > 0) {
      const industry = industries?.filter((item)=>(
        item.slug === slug ? item : null
      ));  
      console.log("Selected Industry:", industry);
      setMeta(industry?.[0]?.industry_meta || industry?.[0]?.meta_debug);

      if (meta) {
        document.title = meta.title || "Default Title";

        let metaDescription = document.querySelector("meta[name='description']");
        if (metaDescription) {
          metaDescription.setAttribute("content", meta.description || "");
        } else {
          metaDescription = document.createElement('meta');
          metaDescription.name = "description";
          metaDescription.content = meta.description || "";
          document.head.appendChild(metaDescription);
        }

        let metaKeywords = document.querySelector("meta[name='keywords']");
        if (metaKeywords) {
          metaKeywords.setAttribute("content", meta.keyword || "");
        } else if (meta.keyword) {
          metaKeywords = document.createElement('meta');
          metaKeywords.name = "keywords";
          metaKeywords.content = meta.keyword;
          document.head.appendChild(metaKeywords);
        }
      }
    } 
  }, [meta,slug,industries]);

// Fetch Industry Meta Titles and Descriptions

  // Fetch reports based on slug
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setReports([]);
        const response = await fetch(`${BASE_URL}/industries-by-category/${slug}`);
        const data = await response.json();
        if (data?.reports) {
          setReports(data.reports);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchReports();
    }
  }, [slug]);



  // Buy Now handler per report
  const handleBuyNow = () => {
    navigate(`/buy-now?id=${reports[0]?.report_id}&type=${type}`);
  };
  console.log("qffwefwef",reports[0]?.report_id)
  

  return (
    <section className="card-section">
      <div className="container">
        <div className="row">
          {/* Reports Cards */}
          <div className="col-lg-9">
            <div className="row">
              {loading ? (
                <div className="text-center w-100">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : reports.length > 0 ? (
                reports.map((report, index) => (
                  <div className="col-12 ad_report" key={index}>
                    <div className="report-card shadow-none">
                      <div className="report-image">
                        <img
                          src={report.image}
                          alt={report.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/Images/press_release_book.png";
                          }}
                        />
                      </div>
                      <div className="report-details">
                        <Link to={`/${report.slug}`} state={{ slug }}>
                          <h1 className="report-title">{report.report_metas.keyword}</h1>
                        </Link>
                        <h5 className="summary-text report-desc desc_content">
                          {parse(report.name)}
                        </h5>
                        <div className="report-meta">
                          <span className="green">No. of Pages:</span> {report.page}
                          <span className="divider">|</span>
                          <span className="orange">Report Code:</span> {report.report_id}
                          <span className="divider">|</span>
                          <span className="price-label">Price:</span> ${report.sprice}
                        </div>
                        <div className="btn-group">
                          <Link
                            to={`/request-details/${report.report_id}`}
                            className="animated-btn text-decoration-none"
                          >
                            <i className="fas fa-download me-2"></i>
                            Request Free Sample
                          </Link>
                          <Button
                            onClick={() => handleBuyNow(report.report_id)}
                            className="animated-btn bg_btn"
                          >
                            <i className="fa-solid fa-cart-shopping me-2"></i>
                            BUY NOW <span>&rarr;</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center w-100">
                  <h3>No Reports Found for this Category</h3>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Categories */}
          <div className="col-lg-3">
            <div className="industies_category">
              <ul className="industies_category_list">
                <li><h3>All Categories</h3></li>
                {industries.length > 0 ? (
                  industries.map((industry) => (
                    <li key={industry.id}>
                      <Link
                        className="industry_link"
                        to={`/industries/${industry.slug}`}
                      >
                        {industry.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <p>Loading Categories...</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industry_Details;
