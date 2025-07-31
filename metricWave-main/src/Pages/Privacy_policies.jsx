import React, { useState, useEffect } from 'react'
import parse from "html-react-parser"
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/api";

const Privacy_policies = () => {

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
        document.title = "Privacy Policy – MetricWave Insights";
        
        const metaDescription = document.querySelector("meta[name='description']");
        if (metaDescription) {
          metaDescription.setAttribute("content", "Learn how we collect, protect, and use your personal information responsibly.");
        } else {
          const meta = document.createElement('meta');
          meta.name = "description";
          meta.content = "Learn how we collect, protect, and use your personal information responsibly.";
          document.head.appendChild(meta);
        }
      }, []);



  return (
    <>
      <div class="privacy_section"></div>
      <div className="terms-container">
        <h1>Privacy Policy</h1>
        {info?.privacy_policy ? (
          <div className="terms-content">
            {parse(info.privacy_policy)}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  )
}

export default Privacy_policies