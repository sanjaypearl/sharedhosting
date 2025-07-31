import React, { useState, useEffect } from "react";
import { FaQuestion } from "react-icons/fa";
import parse from 'html-react-parser';
import { BASE_URL } from "../utils/api";
import useDynamicMeta from "../Component/MetaTagsComponent";



const AboutSection = () => {
  const ammenities = [
    {
      title: "Our Mission",
      paragraph: "To simplify complex markets and enable the decisions informed through high quality research, custom analysis and counseling services to correspond to customer goals.",
      imgUrl: "Images/about1.webp"
    },
    {
      title: "Our Vision",
      paragraph: "Being a reliable partner for reliable and timely market insight to be a reliable partner for clarity, development and a competitive edge.",
      imgUrl: "Images/about7.webp"
    },
    {
      title: "Client-Centric Approach",
      paragraph: "Every project we undertake is designed with the client’s objective in mind. We believe in collaboration, transparency, and delivering research that adds value.",
      imgUrl: "Images/about3.webp"
    },
    {
      title: "Global Coverage",
      paragraph: "Our research extends to North America, Europe, Asia Pacific, Latin America and the Middle East and Africa, which focuses distinctive to emerging markets and regional trends.",
      imgUrl: "Images/about5.webp"
    },
    {
      title: "Commitment to Quality",
      paragraph: "All our reports undergo rigorous verification checks and quality control, ensuring that you get reliable and updated insights for important business decisions",
      imgUrl: "Images/about6.webp"
    },
    {
      title: "Trusted by Global Clients",
      paragraph: "Our client base includes Fortune 1000 companies, SMEs, government organizations, investment firms, and start-ups.",
      imgUrl: "Images/about4.webp"
    },
  ]


  // ============ Website social info  Api ============

  const [aboutContent, setAboutContent] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/info`);
        const data = await response.json();
        setAboutContent(data);
      } catch (error) {
        console.error('Error fetching info:', error);
      }
    };

    fetchInfo();
  }, []);

  // ============ Website social info  Api ============

  // useEffect(() => {
  //       document.title = "About Us – MetricWave Insights";
        
  //       const metaDescription = document.querySelector("meta[name='description']");
  //       if (metaDescription) {
  //         metaDescription.setAttribute("content", "Meet our team and learn how MetricWave delivers trusted market intelligence and analysis worldwide.");
  //       } else {
  //         const meta = document.createElement('meta');
  //         meta.name = "description";
  //         meta.content = "Meet our team and learn how MetricWave delivers trusted market intelligence and analysis worldwide.";
  //         document.head.appendChild(meta);
  //       }
  //     }, []);

useDynamicMeta(2);
  return (
    <>
      <section>
        <img src="Images/About_banners.webp" alt="" className="w-100" />
      </section>
      <section className="about-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="position-relative about_img">
                <img src="Images/about_us_team (2).webp" alt="" className="w-100" />
                <div class="bg-shape d-md-block d-none"></div>
                <div class="imginfo__box d-flex align-items-center justify-content-center">
                  <div class="imginfo__info">
                    {aboutContent && (
                      <h6 class="imginfo__title">{aboutContent.about_us_experience}</h6>
                    )}
                    <p class="mt-1">Years of <br />Experience. </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="container text-center">
                <div className="d-flex align-items-center gap-3">
                  <h2 className="fw-bold text-dark">About <span className="hightlited_text">MetricWave Insights</span></h2>
                </div>
                {aboutContent && (
                  <p className="text-muted">
                    {parse(aboutContent.about_us)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="about_choose_us">
            <div className="row">
              <div className="col-md-6">
                <h5>Why Businesses Choose <span className="hightlited_text">MetricWave Insights</span></h5>
                <ul>
                  <li className="text-muted"><i class="fa-solid fa-circle-check"></i>Real-time, in-depth market research reports</li>
                  <li className="text-muted"><i class="fa-solid fa-circle-check"></i>Region-specific and country-level insights</li>
                  <li className="text-muted"><i class="fa-solid fa-circle-check"></i>A team of experienced analysts and industry experts</li>
                  <li className="text-muted"><i class="fa-solid fa-circle-check"></i>Customized solutions to match your business needs</li>
                  <li className="text-muted"><i class="fa-solid fa-circle-check"></i>Transparent research methods and verified data</li>
                </ul>
                <p className="text-muted">We work closely with every client to understand their challenges and deliver research that truly supports decision-making. Whether you're an enterprise, a government agency, or a growing start-up, we’re here to support your journey with research you can trust.</p>
              </div>
              <div className="col-md-6">
                <img src="/Images/aboutus_section.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ammenities pt-5">
        <div className="container">
          <div className="our_ammenities row">
            {ammenities.map((item) => (
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-3">
                <div className="ammenities_card">
                  <div className="card_img">
                    <img src={item.imgUrl} alt="" />
                  </div>
                  <div className="card_content">
                    <h5>{item.title}</h5>
                    <p>{item.paragraph}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  );
};

export default AboutSection;
