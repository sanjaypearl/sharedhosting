import React, { useEffect, useState ,useRef  } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BASE_URL } from "../utils/api";

const Header = () => {
  // ============ Sticky Header ============
  const [isSticky, setIsSticky] = useState(false);
  const [filteredIndustries, setFilteredIndustries] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ============ Sticky Header ============

  // ============ Login / Profile ============

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status from localStorage on load
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate('/login');
  };
  useEffect(() => {

    if (localStorage.getItem('isLoggedIn') === true) {
      setIsLoggedIn(true);
    }

  }, [])


  // ============ Login / Profile ============


  // ============ Industry Menu Api ============

  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/industries`);
        const data = await response.json();
        // The API has "industries" key
        setIndustries(data.industries);
      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    };

    fetchIndustries();
  }, []);
  

  // ============ Industry Menu Api ============

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



  // ======================= Search Filter =====================

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [indRes, srvRes, repRes] = await Promise.all([
          fetch(`${BASE_URL}/industries`),
          fetch(`${BASE_URL}/service`),
          fetch(`${BASE_URL}/reports`),
        ]);

        const indData = await indRes.json();
        const srvData = await srvRes.json();
        const repData = await repRes.json();

        if (indRes.ok && indData.industries) setIndustries(indData.industries);
        if (srvRes.ok && srvData.services) setServices(srvData.services);
        if (repRes.ok && repData.reports) setReports(repData.reports);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.toLowerCase();

    const matchedIndustries = industries.filter((ind) =>
      ind.name.toLowerCase().includes(q)
    );
    const matchedServices = services.filter((srv) =>
      srv.name.toLowerCase().includes(q)
    );
    const matchedReports = reports.filter((rep) =>
      rep.name.toLowerCase().includes(q)
    );

    setFilteredIndustries(matchedIndustries);
    setFilteredServices(matchedServices);
    setFilteredReports(matchedReports);
    setShowDropdown(true);
  };

  const handleNavigate = (type, value) => {
    if (type === "industry") navigate(`/industries/${value}`);
    if (type === "service") navigate(`/services`);
    if (type === "report") navigate(`/report-details/${value}`);
    setShowDropdown(false);
    setQuery("");
  };


  const closeBtnRef = useRef(null);

    const closeOffcanvas = () => {
    if (closeBtnRef.current) {
      closeBtnRef.current.click();
    }
  } 
const [open, setOpen] = useState(false)
  const handleOpenDropdown =()=>{
    setOpen(true)
  }

  return (
    <>
      <div className="top-header d-md-flex justify-content-between align-items-center px-3 py-2 text-white">
        <div className="contact-marquee">
          <div className="contact-info d-flex gap-sm-0 align-sm-items-center">
            {info && (
              <>
                <Link to={`tel:+1${info.mobile_no1}`}>
                  <i className="fa fa-phone ms-2 me-0"></i> +91 {info.mobile_no1}
                </Link>
                <Link to={`tel:${info.office_1_mobile_no}`}>
                  <i className="fa fa-phone ms-2 me-1"></i>{info.office_1_mobile_no}
                </Link>
                <Link to={`tel:${info.office_2_mobile_no}`}>
                  <i className="fa fa-phone ms-2 me-1"></i>{info.office_2_mobile_no}
                </Link>
                <Link to={`mailto:${info.email}`} className="ms-2">
                  <i className="fa fa-envelope"></i> {info.email}
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="social-icons d-flex gap-2">
          {info && info.social_media && (
            <>
              {info.social_media.facebook && (
                <Link to={info.social_media.facebook} target="_blank"><FaFacebook className="social-icon" /></Link>
              )}
              {info.social_media.instagram && (
                <Link to={info.social_media.instagram} target="_blank"><FaInstagram className="social-icon" /></Link>
              )}
              {info.social_media.twitter && (
                <Link to={info.social_media.twitter} target="_blank"><FaTwitter className="social-icon" /></Link>
              )}
              {info.social_media.youtube && (
                <Link to={info.social_media.youtube} target="_blank"><FaYoutube className="social-icon" /></Link>
              )}
              {info.social_media.linkedin && (
                <Link to={info.social_media.linkedin} target="_blank"><FaLinkedinIn className="social-icon" /></Link>
              )}
            </>
          )}
        </div>
      </div>
      <nav className={`navbar navbar-expand-xl py-3 sticky-top shadow-sm ${isSticky ? "scrolled-header" : ""}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><img src={info?.logo} alt={info?.site_name} /></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-start" tabIndex="-1" id="navbarSupportedContent">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Menu</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ref={closeBtnRef}></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav m-auto mb-2 mb-lg-0 gap-2">
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/" onClick={closeOffcanvas}>Home</NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link dropdown-toggle " : "nav-link dropdown-toggle active"
                    }
                    to="#"
                    onClick={handleOpenDropdown}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Industries
                  </NavLink>
                  <ul className="dropdown-menu">
{open &&
                    <li className="sub_dropdown">
                      <ul>
                        {industries.length > 0 ? industries.map(industry => (
                          <li key={industry.id}>
                            <Link onClick={closeOffcanvas} className="dropdown-item industry_link"  id={industry.id} to={`/industries/${industry.slug}`} >
                              {industry.name}
                            </Link>
                          </li>
                        )) : (
                          <p>Loading industries...</p>
                        )}
                      </ul>
                    </li>}  
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeOffcanvas} to="/services">Services</NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeOffcanvas} to="/press-release">Press Release</NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeOffcanvas} to="/blog">Blog</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeOffcanvas} to="/about">About Us</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeOffcanvas} to="/contact">Contact Us</NavLink>
                </li>
                {!isLoggedIn ? (
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                      to="/login"
                      onClick={closeOffcanvas}
                    >
                      Login
                    </NavLink>
                  </li>
                ) : (
                  <li className="nav-item dropdown profile_menu">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link dropdown-toggle" : "nav-link dropdown-toggle active"
                      }
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Profile
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li className="sub_dropdown w-100">
                        <ul>
                          <li className="w-100">
                            <NavLink to="/profile" style={{ textDecoration: "none" }}><img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="" />Profile</NavLink>
                          </li>
                          <li className="w-100">
                            <button className="dropdown-item industry_link" onClick={handleLogout}>
                              Logout
                            </button>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
              <div className="position-relative search_box">
                <form className="search_header d-flex" onSubmit={handleSearch}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button className="btn btn-outline-success" type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>

                {showDropdown && (
                  <div className="search-dropdown position-absolute bg-white shadow p-3 w-100 z-3 mt-1 rounded">
                    {filteredIndustries.length === 0 &&
                      filteredServices.length === 0 &&
                      filteredReports.length === 0 ? (
                      <p className="mb-0">No results found.</p>
                    ) : (
                      <>
                        {filteredIndustries.length > 0 && (
                          <>
                            <strong>Industries</strong>
                            <ul className="list-unstyled mb-3">
                              {filteredIndustries.map((item) => (
                                <li
                                  key={`ind-${item.id}`}
                                  className="d-flex align-items-center mb-2"
                                  onClick={() => handleNavigate("industry", item.slug)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <span>{item.name}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}

                        {filteredServices.length > 0 && (
                          <>
                            <strong>Services</strong>
                            <ul className="list-unstyled mb-3">
                              {filteredServices.map((srv) => (
                                <li
                                  key={`srv-${srv.id}`}
                                  className="d-flex align-items-center mb-2"
                                  onClick={() => handleNavigate("service", srv.id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <span>{srv.name}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}

                        {filteredReports.length > 0 && (
                          <>
                            <strong>Reports</strong>
                            <ul className="list-unstyled mb-0">
                              {filteredReports.map((rep) => (
                                <li
                                  key={`rep-${rep.id}`}
                                  className="d-flex align-items-center mb-2"
                                  onClick={() => handleNavigate("report", rep.slug)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="fa fa-file-alt me-2 text-primary"></i>
                                  <span>{rep.name}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
