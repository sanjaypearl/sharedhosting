import React, { useState, useEffect } from 'react'
import parse from "html-react-parser"
import { BASE_URL } from "../utils/api";
import { Link } from "react-router-dom";


const HowToOrder = () => {


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

  useEffect(() => {
        document.title = "How to Order – MetricWave Insights";
        
        const metaDescription = document.querySelector("meta[name='description']");
        if (metaDescription) {
          metaDescription.setAttribute("content", "Step-by-step guide to purchasing market research reports securely and easily.");
        } else {
          const meta = document.createElement('meta');
          meta.name = "description";
          meta.content = "Step-by-step guide to purchasing market research reports securely and easily.";
          document.head.appendChild(meta);
        }
      }, []);


  return (
    <>
      <div class="breadcrumb mb-4 p-3 d-flex justify-content-between align-items-center">
              <div>
                <Link to="/" data-discover="true"><i class="fas fa-home"></i></Link>
              </div>
              <h4><strong>How To Order</strong></h4>
              <div></div>
            </div>
      <div className="terms-container">
        <h1 className="terms-title">How To Order</h1>
        {info?.order ? (
          <div className="terms-content">
            {parse(info.order)}
          </div>
        ) : (
          <p>Loading...</p>
        )}

      </div>
    </>
  )
}

export default HowToOrder