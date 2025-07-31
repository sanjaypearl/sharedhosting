import React, { useState, useEffect } from 'react'
import parse from "html-react-parser"
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/api";

const Gdpr_policies = () => {

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
        document.title = "GDPR Policy – MetricWave Insights";
        
        const metaDescription = document.querySelector("meta[name='description']");
        if (metaDescription) {
          metaDescription.setAttribute("content", "Understand your data rights under the EU GDPR and how we comply with data protection regulations.");
        } else {
          const meta = document.createElement('meta');
          meta.name = "description";
          meta.content = "Understand your data rights under the EU GDPR and how we comply with data protection regulations.";
          document.head.appendChild(meta);
        }
      }, []);


  return (
    <>
      <div class="breadcrumb mb-4 p-3 d-flex justify-content-between align-items-center">
              <div>
                <Link to="/" data-discover="true"><i class="fas fa-home"></i></Link>
              </div>
              <h4><strong>GDPR Policy</strong></h4>
              <div></div>
            </div>
      <div className="terms-container">
        {info?.gdpr ? (
          <div className="terms-content">
            {parse(info.gdpr)}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  )
}

export default Gdpr_policies