import React, { useState, useEffect ,useRef } from 'react';
import './App.css';
import '../src/Theme/Style/style.css';
import '../src/Theme/Style/responsive.css';
import Footer from './Component/Footer';
import Header from './Component/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Services from './Pages/Services';
import CustomSearch from './Pages/Custom-Search';
import Career from './Pages/Career';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import Blog from './Pages/Blog';
import Industries from './Pages/industries';
import PressRelease from './Pages/PressRelease';
import IndustryDetails from './Pages/Industry_Details';
import UserProfile from './Pages/Profile';
import PressDetails from './Pages/PressDetails';
import BlogDetails from './Pages/Blog-Detail';
import RequestDetails from './Pages/Request_Details';
import TermConditions from './Pages/Term_conditions';
import PrivacyPolicies from './Pages/Privacy_policies'
import Report from './Pages/Report';
import GDPRBox from './Component/Gdpr';
import GdprPolicies from './Pages/Gdpr_policies';
import ReportDetail from './Pages/Report_detail';
import Testimonials from './Pages/TestimonialView';
import FAQ from './Pages/FAQ';
import HowToOrder from './Pages/HowToOrder';
import Discount from './Pages/Discount';
import Enquiry from './Pages/Enquiry';
import Customization from './Pages/Customization';
import DownlaodSample from './Pages/Download-Sample';
import CookiePolicy from './Pages/Cookie-policy';
import RefundPolicy from './Pages/Refund-Policy';
import BecomeReseller from './Pages/Become_Reseller';
import Client from './Pages/Client';
import ResearchMethology from './Pages/ResearchMethology';
import ScrollToTop from './Component/ScrollToTop';
import BuyNow from './Pages/BuyNow';
import NoErrorPage from './Pages/NoErrorPage';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import PaymentSuccess from './Pages/paymentSuccess';
import ThankYou from './Pages/Thankyou';
import MetaWrapper from './Component/MetaWrapper';


function App() {

  return (
    <>
    <Router>
      <MetaWrapper>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/custom_search" element={<CustomSearch />} />
        <Route path="/about" element={<About />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/press-release" element={<PressRelease />} />
        <Route path="/industries/:slug" element={<IndustryDetails />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/press-details/:slug" element={<PressDetails />} />
        <Route path="/blog-detail/:slug" element={<BlogDetails />} />
        <Route path="/request-details/:slug" element={<RequestDetails />} />
        <Route path="/terms-and-condition" element={<TermConditions />} />
        <Route path="/privacy-policies" element={<PrivacyPolicies />} />
        <Route path="/gdpr-policy" element={<GdprPolicies />} />
        <Route path="/report-store" element={<Report />} />
        <Route path="/:slug" element={<ReportDetail />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path='/how-to-order' element={<HowToOrder />} />
        <Route path="/discount/:reportId" element={<Discount />} />
        <Route path='/inquiry/:reportId' element={<Discount />} />
        <Route path='/customization/:reportId' element={<Discount />} />
        <Route path='/sample/:reportId' element={<DownlaodSample />} />
        <Route path='/cookies' element={<CookiePolicy />} />
        <Route path='/refund-policy' element={<RefundPolicy />} />
        <Route path='/become-reseller' element={<BecomeReseller />} />
        <Route path='/client' element={<Client />} />
        <Route path='/research-methology' element={<ResearchMethology />} />
        <Route path='/buy-now' element={<BuyNow />} />
        <Route path='/payment-success' element={<PaymentSuccess/>} />
        <Route path='/thank-you' element={<ThankYou />} />
        <Route path="*" element={<NoErrorPage />} /> 
      </Routes>
      <GDPRBox />
      <Footer />
      </MetaWrapper>
    </Router>
    </>
  );
}

export default App;
