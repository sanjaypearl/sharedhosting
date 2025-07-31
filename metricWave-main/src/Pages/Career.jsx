import React, {useState , useEffect} from 'react'
import { Form, Button, Alert } from "react-bootstrap";
import { BASE_URL } from "../utils/api";

const Career = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    cv: null,
    message: '',
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cv') {
      setFormData({ ...formData, cv: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('position', formData.position);
    data.append('cv', formData.cv);
    data.append('message', formData.message);

    try {
      const response = await fetch(`${BASE_URL}/carrer`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Application submitted successfully!");
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          cv: null,
          message: '',
        });
        document.getElementById('cv').value = ''; // Reset file input
        console.log("Form Data:", result);
      } else {
        setError(result.message || "Something went wrong!");
        console.log("Form Data:", result);
      }
    } catch (err) {
      setError("Error submitting form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
        document.title = "Careers – Join MetricWave Insights";
        
        const metaDescription = document.querySelector("meta[name='description']");
        if (metaDescription) {
          metaDescription.setAttribute("content", "Explore exciting career opportunities and grow your expertise in market research and analytics with us.");
        } else {
          const meta = document.createElement('meta');
          meta.name = "description";
          meta.content = "Explore exciting career opportunities and grow your expertise in market research and analytics with us.";
          document.head.appendChild(meta);
        }
      }, []);

  return (
    <>
    <section className="banner_section career_banner">
        {/* <h2>Our Services</h2> */}
      </section>
      <section className='py-5 career_section'>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="career_content">
                <h2><span className='metric'>Metric Wave</span> <span className='insight'>Insights</span> - Join Our Team</h2>
                <p>At Metric Wave Insights, we are committed to making informed business decisions. Our insights-driven professionals operate at the intersection of data, analytics, and strategic thinking to deliver actionable market insights to our customers.</p>
                <div className="career_data mt-4">
                  <h5>Why Metric Wave Insights?</h5>
                  <p>We are dedicated to creating a place for exceptional people to flourish. As you join our organization, you will be part of an organization that focuse0073</p>
                  <ul>
                    <li><strong>Innovation:</strong>We are always seeking innovative solutions to complex market problems</li>
                    <li><strong>Collaboration:</strong>Our success comes from coming together of various perspectives and ability</li>
                    <li><strong>Growth:</strong>We invest in your career growth and professional development</li>
                    <li><strong>Impact:</strong>Your work has direct impact on strategic decisions for top brands</li>
                  </ul>
                </div>
                <div className="career_data mt-4">
                  <h5>Our Culture</h5>
                  <p>Our culture is founded on excellence and balance. We create a world of intellectual curiosity, respect for one another, and enjoyment of exceptional contributions. Our employees have flexible work arrangements, competitive pay, and the opportunity to establish strong bonds with their co-workers.</p>
                </div>
                <div className="career_data mt-4">
                  <h5>We're Hiring</h5>
                  <ul>
                    <li><strong>•	Market Research Analyst :</strong>Remote / Full-time</li>
                    <li><strong>•	Business Development Executive :</strong>Remote / Full-time</li>
                    <li><strong>•	Digital Marketing Specialist:</strong>Remote / Full-time</li>
                    <li><strong>•	Content Marketing Specialist :</strong>Remote / Full-time Or Part Time</li>
                    <li><strong>•	Freelance Writers & Industry Experts  :</strong>Project-based</li>
                  </ul>
                </div>
                <div className="career_data mt-4">
                  <h5>💡Don’t see your role listed?</h5>
                  <p>We’re always open to hearing from talented people. Email us at
                  <a href="mailto:hr@metricwaveinsights.com">hr@metricwaveinsights.com</a>and tell us how you’d like to contribute.</p>
                </div>
              </div>
            </div>
           <div className="col-md-6">
              <div className="contact-form">
                <h3 className="text-uppercase fw-bold mb-4 text-center">Please fill in the below form.</h3>
                {success && <Alert variant="success">{success}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                {loading && <p>Sending message...</p>}

                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className=""
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className=""
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPhone" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className=""
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPosition" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className=""
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="cv" className="mb-3">
                    <Form.Control
                      type="file"
                      name="cv"
                      onChange={handleChange}
                      className=""
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formMessage" className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Write Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className=""
                      required
                    />
                  </Form.Group>

                  <Button variant="warning" type="submit" className="text-white w-100" disabled={loading}>
                    {loading ? "Sending..." : "SEND APPLICATION"}
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Career