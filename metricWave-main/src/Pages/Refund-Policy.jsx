import React, { useState, useEffect } from 'react';
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/api";


const RefundPolicy = () => {


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
    document.title = "Refund Policy – MetricWave Insights";
    
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", "Review our policy on refunds and returns for purchased reports and services.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Review our policy on refunds and returns for purchased reports and services.";
      document.head.appendChild(meta);
    }
  }, []);


  return (
    <>
      <div class="breadcrumb mb-4 p-3 d-flex justify-content-between align-items-center">
        <div>
          <Link to="/" data-discover="true"><i class="fas fa-home"></i></Link>
          
        </div>
        <h4><strong>Refund Policy</strong></h4>
        <div></div>
      </div>
      <div className="terms-container">
        <h1 className="terms-title">Refund Policy</h1>
        {info?.refund_policy ? (
          <div className="terms-content">
            {parse(info.refund_policy)}
          </div>
        ) : (
          <p>Loading...</p>
        )}

      </div>
    </>
  )
}

export default RefundPolicy