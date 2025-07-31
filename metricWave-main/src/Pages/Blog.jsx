import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import { BASE_URL } from "../utils/api";
import useDynamicMeta from "../Component/MetaTagsComponent";
import { Helmet } from "react-helmet-async";


const BlogList = ({ blog, heading, colClass = "col-md-6 col-lg-4 mb-4", showBanner = true }) => {
  const [blogData, setBlogData] = useState([]);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [noDataTimeoutReached, setNoDataTimeoutReached] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/blog`);
        const data = await res.json();
        console.log("API Response:", data);

        if (Array.isArray(data.blogs) && data.blogs.length > 0) {
          setBlogData(data.blogs);
        } else {
          setBlogData([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogData([]);
      } finally {
        setTimeout(() => {
          setNoDataTimeoutReached(true);
          setLoading(false);
        }, 5000); // Delay loader for 5 seconds
      }
    };

    fetchBlogs();
  }, []);
  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // useEffect(() => {
  //       document.title = "Blog – Market Trends & Insights | MetricWave";
        
  //       const metaDescription = document.querySelector("meta[name='description']");
  //       if (metaDescription) {
  //         metaDescription.setAttribute("content", "Explore articles and analyses covering emerging market trends and actionable strategies.");
  //       } else {
  //         const meta = document.createElement('meta');
  //         meta.name = "description";
  //         meta.content = "Explore articles and analyses covering emerging market trends and actionable strategies.";
  //         document.head.appendChild(meta);
  //       }
  //     }, []);

      useDynamicMeta(5);

  return (
    <>
    <Helmet>
        {/* Canonical and Basic Meta Tags */}
        <link rel="canonical" href="https://www.metricwaveinsights.com/blog" />
        <meta name="author" content="MetricWave Insights" />
        <meta name="publisher" content="MetricWave Insights" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Blog – Market Trends & Insights | MetricWave" />
        <meta
          property="og:description"
          content="Explore articles and analyses covering emerging market trends and actionable strategies."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.metricwaveinsights.com/blog" />
        <meta
          property="og:image"
          content="https://metricwaveinsights.com/admin/public/front/logo/logo.webp"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Blog – Market Trends & Insights | MetricWave" />
        <meta name="twitter:site" content="@metricwaveinsights" />
        <meta
          name="twitter:description"
          content="Explore articles and analyses covering emerging market trends and actionable strategies."
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
            "name": "Blog – Market Trends & Insights | Metric Wave",
            "url": "https://www.metricwaveinsights.com/blog",
            "description": "Explore articles and analyses covering emerging market trends and actionable strategies.",
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
      {showBanner && (
        <section className="banner_section blog_banner">
        </section>
      )}
      <section className="blog_tabs_section card-section">
        {heading && <h2 class="text-center mb-4">Our <span class="hightlited_text">{heading}</span></h2>}
        <div className="container">
          <div className="row">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : blogData.length === 0 && noDataTimeoutReached ? (
              <div className="text-center py-5">
               <p className="mt-3">No Blogs Available.</p>
              </div>
            ) : (
              blogData.map((blog) => {
                const isExpanded = expandedIds.has(blog.id);
                return (
                  <div className={colClass} key={blog.id}>
                    <div className="card-box">
                      <div className="card-img">
                        <Link to={`/blog-detail/${blog.slug}`}>
                          <img src={blog.image} alt={blog.name} />
                        </Link>
                      </div>
                      <p className="details">
                        <span className="time">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-clock"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        </span>
                        <span className="super">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <span>Auther Name</span>
                        </span>
                      </p>
                      <div className="card-content">
                        <Link to={`/blog-detail/${blog.slug}`}>
                          <h2>{blog.name}</h2>
                        </Link>
                        <p className={`blog-paragraph ${isExpanded ? "expanded" : "clamped"}`}>
                          {parse(blog.description)}
                        </p>
                        <div className="card-buttons justify-content-center">
                          <Link to={`/blog-detail/${blog.slug}`} className="main_btn" onClick={() => toggleExpand(blog.id)}>
                            {isExpanded ? "Show less" : "View more"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </section>
    </>

  );
};

export default BlogList;
