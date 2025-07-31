import React, { useState, useEffect } from 'react'
import parse from "html-react-parser"
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/api";


const ResearchMethology = () => {


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
          document.title = "Research Methodology – MetricWave Insights";
          
          const metaDescription = document.querySelector("meta[name='description']");
          if (metaDescription) {
            metaDescription.setAttribute("content", "Discover our proven research methods combining primary and secondary data for accuracy and insight.");
          } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = "Discover our proven research methods combining primary and secondary data for accuracy and insight.";
            document.head.appendChild(meta);
          }
        }, []);


  return (
    <>
      <div class="breadcrumb mb-4 p-3 d-flex justify-content-between align-items-center">
        <div>
          <i class="fas fa-home"></i><Link to="/" data-discover="true">Home</Link>
          <span class="mx-2">/</span>Research Methology
        </div>
        <h4><strong>Research Methology</strong></h4>
        <div></div>
      </div>
      <div className="terms-container">
        <h1 className="terms-title">Research Methology</h1>
        {info?.research_methodology ? (
          <div className="terms-content">
            {parse(info.research_methodology)}
          </div>
        ) : (
          <p>Loading...</p>
        )}

      </div>
    </>
  )
}

export default ResearchMethology