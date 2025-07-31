import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/api';
import useDynamicMeta from '../Component/MetaTagsComponent';
import { Helmet } from 'react-helmet-async';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${BASE_URL}/service`);
        const data = await response.json();

        if (response.ok && data.services?.length) {
          const sorted = data.services.sort((a, b) => a.priority - b.priority);
          setServices(sorted);
        } else {
          setError('No service data found.');
        }
      } catch (err) {
        setError('Error fetching services.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
        document.title = "Market Research Services – MetricWave Insights";
        
        const metaDescription = document.querySelector("meta[name='description']");
        if (metaDescription) {
          metaDescription.setAttribute("content", "Explore tailored market research, competitor analysis, and strategic consulting to drive informed decisions.");
        } else {
          const meta = document.createElement('meta');
          meta.name = "description";
          meta.content = "Explore tailored market research, competitor analysis, and strategic consulting to drive informed decisions.";
          document.head.appendChild(meta);
        }
      }, []);
      
      useDynamicMeta(4);
      
  if (loading) return <p className="text-center py-5">Loading services...</p>;
  if (error) return <p className="text-center text-danger py-5">Services not available at the moment.</p>;


  return (
    <>
    <Helmet>
        {/* Canonical & Basic Meta */}
        <link rel="canonical" href="https://www.metricwaveinsights.com/services" />
        <meta name="author" content="MetricWave Insights" />
        <meta name="publisher" content="MetricWave Insights" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:title" content="Market Research Services – MetricWave Insights" />
        <meta
          property="og:description"
          content="Explore tailored market research, competitor analysis, and strategic consulting to drive informed decisions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.metricwaveinsights.com/services" />
        <meta
          property="og:image"
          content="https://metricwaveinsights.com/admin/public/front/logo/logo.webp"
        />

        {/* Twitter Meta */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Market Research Services – MetricWave Insights" />
        <meta name="twitter:site" content="@https://www.metricwaveinsights.com/services" />
        <meta
          name="twitter:description"
          content="Explore tailored market research, competitor analysis, and strategic consulting to drive informed decisions."
        />
        <meta
          name="twitter:image"
          content="https://metricwaveinsights.com/admin/public/front/logo/logo.webp"
        />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Market Research Services – Metric Wave Insights",
            "url": "https://www.metricwaveinsights.com/services",
            "description": "Explore tailored market research, competitor analysis, and strategic consulting to drive informed decisions.",
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
      <section className="banner_section service_banner" />
      <section className="service_details py-5">
        <div className="container">
          {services.length ? (
            services.map((service, index) => (
              <div className="service_content_item mb-5" key={service.id}>
                <div className={`row ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="col-md-7">
                    <div className="service_content">
                      <h3>{service.name}</h3>
                      <div
                        className="text-muted"
                        dangerouslySetInnerHTML={{ __html: service.description }}
                      />
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="service_image">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="img-fluid rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Services not available at the moment.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Services;
