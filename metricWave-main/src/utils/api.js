export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API = {
    // ========== Report Endpoints ==========
    REPORTS: `${BASE_URL}/reports`,
    REPORT_DETAILS: (slug) => `${BASE_URL}/reports-detail/${slug}`,
    REPORT_REQUEST_SAMPLE: (slug) => `${BASE_URL}/report-request-sample/${slug}`,
    SAMPLE_REPORT_REQUEST: `${BASE_URL}/sample-report-request`,

    // ========== Country / Services ==========
    COUNTRIES: `${BASE_URL}/country-with-phone-code`,
    SERVICES: `${BASE_URL}/service`,

    // ========== Contact / Inquiry ==========
    CONTACT_US: `${BASE_URL}/contact-us`,

    // ========== Newsletter / Subscription ==========
    SUBSCRIBE: `${BASE_URL}/subscriber`,
    FAQ: `${BASE_URL}/faq`,
    BECOME_SELLER: `${BASE_URL}/become-reseller`,

    // ========== User Register API ==========

    REGISTER: `${BASE_URL}/user/register`,
    LOGIN: `${BASE_URL}/user/login`,
    PROFILE: `${BASE_URL}/user/profile`,
    LOGOUT: `${BASE_URL}/user/logout`,
    FORGOT_PASSWORD: `${BASE_URL}/forget-password`,

    // ========== WEBSIE INFO ==========

    WEB_INFO: `${BASE_URL}/info`,
    // ========== INDUSTRIES ==========
    INDUSTRIES: `${BASE_URL}/industries`,
    INDUSTRIES_SLUG: (slug) => `${BASE_URL}/industries-by-category/${slug}`,
    // ========== BLOGS ==========
    BLOG: `${BASE_URL}/blog`,
    BLOG_DETAIL: (slug) => `${BASE_URL}/blog-detail/${slug}`,
    // ========== {PRESS RELEASE} ==========
    PRESS_RELEASE: `${BASE_URL}/press-release`,
    PRESS_RELEASE_DETAILS: (slug) => `${BASE_URL}/press-release-detail/${slug}`,
    // ========== CARREER ==========
    CARRER: `${BASE_URL}/carrer`,
    // ========== CLIENTS ==========
    CLIENT: `${BASE_URL}/client`,
    // ========== Company ==========
    COMPANY: `${BASE_URL}/company`,
    CUSTOM_PURCHASE_REPORT: (slug) => `${BASE_URL}/custom-buy-now-link/${slug}`,
};

