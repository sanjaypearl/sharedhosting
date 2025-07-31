import React, { useEffect, useState } from 'react';
import Carousel from '../Component/Home/Carousel';
import { Link } from 'react-router-dom';
import Testimonial from '../Component/Home/Testimonial';
import Form from 'react-bootstrap/Form';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import BlogList from '../Pages/Blog';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { BASE_URL } from '../utils/api';
import { Helmet } from 'react-helmet-async';
import useDynamicMeta from '../Component/MetaTagsComponent';



const Home = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clients, setClients] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [reports, setReports] = useState({});
  const [activeTab, setActiveTab] = useState(industries[0]?.slug || '');
  const [showAllIndustries, setShowAllIndustries] = useState(false);
  const navigate = useNavigate();
  const [pressInfo, setPressInfo] = useState([]);
  const [showAllPress, setShowAllPress] = useState(false);
  const [services, setServices] = useState([]);



  useEffect(() => {
    fetch(`${BASE_URL}/company`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.companys) {
          setClients(data.companys);
        }
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, []);




  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/industries`);
        const data = await response.json();

        if (Array.isArray(data.industries) && data.industries.length > 0) {
          setIndustries(data.industries);
          setActiveTab(data.industries[0].slug);
        } else {
          console.warn("No industries found");
          setIndustries([]);
        }

      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    };

    fetchIndustries();
  }, []);



  useEffect(() => {
    const fetchReports = async () => {
      if (!activeTab) return;
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/industries-by-category/${activeTab}`);
        const data = await response.json();
        setReports((prev) => ({
          ...prev,
          [activeTab]: data.reports || [],
        }));
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [activeTab]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);


  useEffect(() => {

    const fetchInfo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/press-release`);
        const data = await response.json();
        console.log("API Response:", data);

        if (Array.isArray(data.pressReleases) && data.pressReleases.length > 0) {
          setPressInfo(data.pressReleases);
          setLoading(false); // stop loader immediately
        } else {
          setPressInfo([]);
          // wait 5 seconds then stop loader
          setTimeout(() => setLoading(false), 5000);
        }
      } catch (error) {
        console.error('Error fetching info:', error);
        setPressInfo([]);
        // wait 5 seconds then stop loader
        setTimeout(() => setLoading(false), 5000);
      }
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    function injectSeoTags() {
      // Helper to create or update meta tags by name
      function setMetaTag(name, content) {
        let tag = document.querySelector(`meta[name="${name}"]`);
        if (tag) {
          tag.setAttribute("content", content);
        } else {
          tag = document.createElement("meta");
          tag.setAttribute("name", name);
          tag.setAttribute("content", content);
          document.head.appendChild(tag);
        }
      }

      // Inject or update canonical link
      function setCanonicalLink(href) {
        let link = document.querySelector('link[rel="canonical"]');
        if (link) {
          link.setAttribute("href", href);
        } else {
          link = document.createElement("link");
          link.setAttribute("rel", "canonical");
          link.setAttribute("href", href);
          document.head.appendChild(link);
        }
      }

      // Inject JSON-LD script
      function setJsonLdScript(jsonObject) {
        // Remove previous if exists
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
          existingScript.remove();
        }

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(jsonObject);
        document.head.appendChild(script);
      }

      // Set canonical
      setCanonicalLink("https://www.metricwaveinsights.com/");

      // Set meta tags
      setMetaTag("author", "MetricWave Insights");
      setMetaTag("publisher", "MetricWave Insights");
      setMetaTag("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

      // Set JSON-LD data
      const jsonLdData = {
        "@context": "https://schema.org",
        "@type": "Corporation",
        "name": "MetricWave Insights",
        "url": "https://www.metricwaveinsights.com/",
        "logo": "https://metricwaveinsights.com/admin/public/front/logo/logo.webp",
        "alternateName": "MetricWave Insights – Actionable Market Research",
        "sameAs": [
          "https://www.facebook.com/metricwaveinsights",
          "https://www.instagram.com/metricwaveinsights/",
          "https://www.youtube.com/@metricwaveinsights",
          "https://www.linkedin.com/company/metricwave-insights/"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91 9270434043",
            "contactType": "customer service",
            "email": "sales@metricwaveinsights.com",
            "areaServed": "IN",
            "availableLanguage": ["en", "hi"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+1 812 506 4440",
            "contactType": "",
            "email": "sales@metricwaveinsights.com",
            "areaServed": "US",
            "availableLanguage": "en"
          },
          {
            "@type": "ContactPoint",
            "telephone": "+39 3349953425",
            "contactType": "customer service",
            "email": "sales@metricwaveinsights.com",
            "areaServed": "IT",
            "availableLanguage": "it"
          }
        ]
      };

      setJsonLdScript(jsonLdData);
    }
    injectSeoTags()


  }, [])


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${BASE_URL}/service`);
        const data = await response.json();

        if (response.ok && Array.isArray(data.services)) {
          const sortedServices = data.services.sort((a, b) => {
            const priorityA = a.priority ?? Infinity;
            const priorityB = b.priority ?? Infinity;
            return priorityA - priorityB;
          });

          setServices(sortedServices);
        } else {
          // No data or wrong format
          setServices([]);
        }
      } catch (err) {
        console.error("Service API error:", err);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useDynamicMeta(1);


  console.log("sdgss", useDynamicMeta)
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://www.metricwaveinsights.com/" />
        <meta name="author" content="MetricWave Insights" />
        <meta name="publisher" content="MetricWave Insights" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:title" content="MetricWave Insights – Actionable Market Research" />
        <meta
          property="og:description"
          content="Unlock growth with data-driven market research, industry insights, and strategic solutions for your business."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.metricwaveinsights.com/" />
        <meta
          property="og:image"
          content="https://metricwaveinsights.com/admin/public/front/logo/logo.webp"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="MetricWave Insights – Actionable Market Research" />
        <meta name="twitter:site" content="@https://www.metricwaveinsights.com/" />
        <meta
          name="twitter:description"
          content="Unlock growth with data-driven market research, industry insights, and strategic solutions for your business."
        />
        <meta
          name="twitter:image"
          content="https://metricwaveinsights.com/admin/public/front/logo/logo.webp"
        />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Corporation",
              "name": "MetricWave Insights",
              "url": "https://www.metricwaveinsights.com/",
              "logo": "https://metricwaveinsights.com/admin/public/front/logo/logo.webp",
              "alternateName": "MetricWave Insights – Actionable Market Research",
              "sameAs": [
                "https://www.facebook.com/metricwaveinsights",
                "https://www.instagram.com/metricwaveinsights/",
                "https://www.youtube.com/@metricwaveinsights",
                "https://www.linkedin.com/company/metricwave-insights/"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+91 9270434043",
                  "contactType": "customer service",
                  "email": "sales@metricwaveinsights.com",
                  "areaServed": "IN",
                  "availableLanguage": ["en"]
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+1 812 506 4440",
                  "contactType": "sales",
                  "email": "sales@metricwaveinsights.com",
                  "areaServed": "US",
                  "availableLanguage": "en"
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+39 3349953425",
                  "contactType": "customer service",
                  "email": "sales@metricwaveinsights.com",
                  "areaServed": "IT",
                  "availableLanguage": "it"
                }
              ]
            }
          `}
        </script>
      </Helmet>
      <Carousel />
      <h1></h1>
      <section className='our_client'>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="our_client_content">
                <h5>Existsdsing Client</h5>
                <p>Created Billion Dollars of revenue impact on Thousands of Client</p>
                <Link to='/client' className='main_btn mb-0 mx-0'>View All Our Client</Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="our_client_img">
                <img src="/Images/brands.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ----------------- service offer --------------- */}
      <section className="service_offer _ad_change">
        <div className="container">
          <h2 className="text-center mb-4">
            OUR <span className="hightlited_text"> SERVICES</span>
          </h2>

          {/* Show loader */}
          {loading && <p className="text-center py-5">Loading services...</p>}

          {/* Show if no services */}
          {!loading && services.length === 0 && (
            <p className="text-center mt-3 py-5">Services not available at the moment.</p>
          )}

          {/* Show services list */}
          {!loading && services.length > 0 && (
            <div className="row">
              {services.slice(0, 6).map((service, index) => (
                <div className="col-12 col-sm-6 col-lg-4" key={index}>
                  <div className="service_card p-3">
                    <div className="d-flex gap-3 align-items-center mb-3 _ad_service_card">
                      <img src={service.image} alt={service.name} />
                      <h4>{service.name}</h4>
                    </div>
                    <p className="text-muted service_description"
                      dangerouslySetInnerHTML={{ __html: service.description }} />
                    <Link to="/services" className="animated-underline">Read More</Link>
                  </div>
                </div>
              ))}
              <div className="col-12 text-center mt-2">
                <Link to="/services" className="main_btn mb-0">View More</Link>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* ----------------- service offer --------------- */}
      {/* ----------------- Industry Career --------------- */}
      <section className="industry_career">
        <div className="container">
          <h2 className="section_heading text-white">Latest Publication </h2>
          <div className="row">
            {/* Left Tab Menu */}
            <div className="col-md-3">
              <ul className="nav nav-pills mb-3" role="tablist">
                {(showAllIndustries ? industries : industries.slice(0, 5)).map((industry, index) => (
                  <li
                    className="nav-item"
                    key={index}
                    role="presentation"
                    id={`tab-${industry.slug}`}
                  >
                    <button
                      className={`nav-link ${activeTab === industry.slug ? 'active' : ''}`}
                      onClick={() => setActiveTab(industry.slug)}
                      type="button"
                      role="tab"
                    >
                      {industry.name}
                    </button>
                  </li>
                ))}

                {industries.length > 5 && (
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link text-primary font-weight-bold"
                      onClick={() => setShowAllIndustries(!showAllIndustries)}
                      type="button"
                      tabIndex={-1}
                    >
                      {showAllIndustries ? 'Show Less' : 'Show More'}
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Right Tab Content */}
            <div className="col-md-9">
              {loading ? (
                <p className="text-white">Loading...</p>
              ) : (
                <div className="tab-content">
                  <div className="tab-pane fade show active">
                    <div className="industry_data_cards">
                      <div className="row">
                        {(reports[activeTab] || []).map((item, index) => (
                          <div className="col-md-6 mb-3" key={index}>
                            <div className="indusrty_card_item">
                              <h5 className="fw-bold">{item.name}</h5>
                              <span className="mb-1">
                                <strong>Published Date:</strong> {item.published_date}
                              </span>
                              <p>{item.short_description}</p>
                              <Link to={`/${item.slug}`}>
                                <div className="main_btn mb-0">View more</div>
                              </Link>
                            </div>
                          </div>
                        ))}
                        {reports[activeTab]?.length === 0 && (
                          <div className="col-12">
                            <p className="mt-3">No reports available for this industry.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ✅ View More Button for Active Industry */}
          <div className="text-center mt-4">
            <Link className="main_btn mb-0" to={`/industries/${activeTab}`}>
              View More
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------- Industry Career --------------- */}

      {/* ----------------- Press Release --------------- */}

      <section className="press_release_section">
        <div className="container">
          <h2 className='text-center mb-4'>Press <span className="hightlited_text">Releases</span></h2>
        </div>

        <div className='press_content_section'>
          <div className='container'>
            <div className="row">

              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : pressInfo.length > 0 ? (
                (showAllPress ? pressInfo : pressInfo.slice(0, 2)).map((press) => (
                  <div className="col-md-6" key={press.id}>
                    <div className="press-page">
                      <div className="press-card">
                        <div className="press-icon">
                          <img src="Images/press_release_2.webp" alt="" />
                        </div>
                        <div className="press-content">
                          <Link to={`/press-details/${press.slug}`} className='text-decoration-none'>
                            <h4 className="press-title">{press.name}</h4>
                          </Link>
                          <p className="press-date"><strong>Published Date :</strong> Apr 2025</p>
                          <p className='_press_para'>{parse(press.description)}</p>
                          <Link to={`/press-details/${press.slug}`} className="_ad_anchor">View More</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-5">
                  <p className="mt-3">No data available in the Press Release.</p>
                </div>
              )}

            </div>

            {!showAllPress && pressInfo.length > 2 && (
              <div className="text-center">
                <button className="main_btn mb-0" onClick={() => setShowAllPress(true)}>
                  View More
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ----------------- Press Release --------------- */}
      <div className="home_blog_section">
        <BlogList heading="Blogs" colClass="col-lg-4 col-md-6 " showBanner={false} />
        <div className="col-12 text-center">
          <Link to="/blog" className='main_btn mb-0'>View More</Link>
        </div>
      </div>


      {/* ----------------- Testimonial --------------- */}
      <div className="testimonial_section">
        <Testimonial type="swiper" />
        <div className='text-center'>
          <Link to="/testimonials" className='main_btn mb-0'>View More</Link>
        </div>
      </div>
      {/* ----------------- Testimonial --------------- */}


    </>
  );
};

export default Home;
