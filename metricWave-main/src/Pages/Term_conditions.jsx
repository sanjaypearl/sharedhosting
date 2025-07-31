import React, { useState, useEffect } from 'react'
import parse from "html-react-parser"
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/api";


const Term_conditions = () => {


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
      document.title = "Terms & Conditions – MetricWave Insights";
      
      const metaDescription = document.querySelector("meta[name='description']");
      if (metaDescription) {
        metaDescription.setAttribute("content", "Review the terms governing the use of our website, reports, and services.");
      } else {
        const meta = document.createElement('meta');
        meta.name = "description";
        meta.content = "Review the terms governing the use of our website, reports, and services.";
        document.head.appendChild(meta);
      }
    }, []);


  return (
    <>
    
      <div class="term_condition_section"></div>
      <div className="terms-container">
        <h1 className="terms-title">Term & Condition</h1>
        {info?.term_condition ? (
          <div className="terms-content">
            {parse(info.term_condition)}
          </div>
        ) : (
          <p>Loading...</p>
        )}

      </div>
    </>
  )
}

export default Term_conditions