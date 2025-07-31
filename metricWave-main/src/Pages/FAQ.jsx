import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { BASE_URL } from '../utils/api';

const FAQ = ({ showHeading = true, contactSec = true }) => {
    const [faqData, setFaqData] = useState([]);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await fetch(`${BASE_URL}/faq`);
                const result = await response.json();
                if (response.ok && result.faqs) {
                    setFaqData(result.faqs);
                }
            } catch (error) {
                console.error("Failed to fetch FAQ data:", error);
            }
        };

        fetchFAQs();
    }, []);

    useEffect(() => {
        document.title = "FAQs – MetricWave Insights";
        
        const metaDescription = document.querySelector("meta[name='description']");
        if (metaDescription) {
          metaDescription.setAttribute("content", "Find answers to common questions about our reports, services, ordering process, and support.");
        } else {
          const meta = document.createElement('meta');
          meta.name = "description";
          meta.content = "Find answers to common questions about our reports, services, ordering process, and support.";
          document.head.appendChild(meta);
        }
      }, []);

    return (
        <>
            {showHeading && (
                <section className='pb-2 pt-5'>
                    <div className="container">
                        <h2 className='text-center mb-3'><span className='hightlited_text'>Customer FAQ's</span></h2>
                        <h5 className='text-center'>Everything You Need to Know Before You Order</h5>
                        <p className='text-muted text-center'>
                            We understand that choosing the right research partner is an important decision.
                            Below are answers to the most common questions we receive from new and returning customers.
                        </p>
                    </div>
                </section>
            )}

            <section className='py-5'>
                <div className="container">
                    <div className="faq_container">
                        <Accordion defaultActiveKey="0">
                            {faqData.map((item, index) => (
                                <Accordion.Item eventKey={index.toString()} key={index} className='mb-3'>
                                    <Accordion.Header>{item.title}</Accordion.Header>
                                    <Accordion.Body className='text-muted'>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </div>
                    {contactSec && (
                        <>
                            <p className='text-muted mt-4'>Still have questions?</p>
                            <h6><i className="fa-solid fa-envelope me-2"></i><span>Email:</span> sales@metricwaveinsights.com</h6>
                            <h6><i className="fas fa-phone me-2"></i><span>Call Us:</span> +91 9270434043</h6>
                            <p className='text-muted'>We're here to help you make the right decision with confidence.</p>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default FAQ;
