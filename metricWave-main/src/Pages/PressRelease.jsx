import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { BASE_URL } from '../utils/api';
import useDynamicMeta from '../Component/MetaTagsComponent';
import { Helmet } from 'react-helmet-async';

const PressRelease = () => {
  const [pressInfo, setPressInfo] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/press-release`);
        const data = await response.json();
        console.log("API Response:", data);
        setPressInfo(data.pressReleases);
      } catch (error) {
        console.error('Error fetching info:', error);
        setPressInfo([]);
      }
    };

    fetchInfo();
  }, []);
console.log("Press Info:", pressInfo);

 useEffect(() => {
        document.title = "Press Releases – News & Updates | MetricWave Insights";
        
        const metaDescription = document.querySelector("meta[name='description']");
        if (metaDescription) {
          metaDescription.setAttribute("content", "Read our latest press releases, company news, and announcements.");
        } else {
          const meta = document.createElement('meta');
          meta.name = "description";
          meta.content = "Read our latest press releases, company news, and announcements.";
          document.head.appendChild(meta);
        }
      }, []);

      useDynamicMeta(6);

  return (
    <>
    <Helmet>
        {/* Canonical and Basic Meta */}
        <link rel="canonical" href="https://www.metricwaveinsights.com/press-release" />
        <meta name="author" content="MetricWave Insights" />
        <meta name="publisher" content="MetricWave Insights" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        {/* Open Graph Meta */}
        <meta property="og:title" content="Press Releases – News & Updates | MetricWave Insights" />
        <meta
          property="og:description"
          content="Read our latest press releases, company news, and announcements."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.metricwaveinsights.com/press-release" />
        <meta
          property="og:image"
          content="https://metricwaveinsights.com/admin/public/front/logo/logo.webp"
        />

        {/* Twitter Meta */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Press Releases – News & Updates | MetricWave Insights" />
        <meta name="twitter:site" content="@metricwaveinsights" />
        <meta
          name="twitter:description"
          content="Read our latest press releases, company news, and announcements."
        />
        <meta
          name="twitter:image"
          content="https://metricwaveinsights.com/admin/public/front/logo/logo.webp"
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Press Releases – News & Updates | Metric Wave Insights",
            "url": "https://www.metricwaveinsights.com/press-release",
            "description": "Read our latest press releases, company news, and announcements.",
            "inLanguage": "en",
            "isPartOf": {
              "@type": "WebSite",
              "name": "MetricWave Insights",
              "url": "https://www.metricwaveinsights.com/"
            },
            "publisher": {
              "@type": "Organization",
              "name": "MetricWave Insights",
              "logo": {
                "@type": "ImageObject",
                "url": "https://metricwaveinsights.com/admin/public/front/logo/logo.webp"
              }
            }
          }
          `}
        </script>
      </Helmet>
    <section className="banner_section press_banner">
      </section>
    <section className='press_content_section'>
      <div className='container'>
        {pressInfo && pressInfo.length > 0 ? (
          pressInfo?.map((press) => (
            <div className="press-page" key={press.id}>
              <div className="press-card">
                <div className="press-icon">
                  <img src="Images/press_release_2.webp" alt="" />
                </div>
                <div className="press-content">
                  <Link  to={`/press-details/${press.slug}`} className='text-decoration-none'><h4 className="press-title">{press.name}</h4></Link>
                  <p className="press-date"><strong>Published Date :</strong> Apr 2025</p>
                  <p className='_press_para'>{parse(press.description)}
                  </p>
                  <Link to={`/press-details/${press.slug}`} className="_ad_anchor">View More</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
        <div className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        )}
      </div>
    </section>
    </>
  );
}

export default PressRelease;
