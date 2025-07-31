import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { BASE_URL } from '../../utils/api';

const Testimonial = ({ type = 'swiper' }) => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${BASE_URL}/client`);
        const data = await res.json();
        if (data?.clients) {
          setTestimonialData(data.clients);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <p className="text-center py-5">Loading testimonials...</p>;
  }

  if (!testimonialData.length) {
    return (
      <section className="testimonial">
        <div className="container text-center py-5">
          <h2 className="testimonial__title">
            Our <span className="hightlited_text">Testimonial</span>
          </h2>
          <p className="mt-3">Testimonials not available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="testimonial">
      <div className="container">
        <div className="testimonial__content text-center">
          <h2 className="testimonial__title">
            Our <span className="hightlited_text">Testimonial</span>
          </h2>
        </div>

        {type === 'swiper' ? (
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2555500, disableOnInteraction: false }}
            loop={true}
            modules={[Pagination, Autoplay]}
            className="mySwiper testimonial_swiper mt-5"
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 10 },
              576: { slidesPerView: 1, spaceBetween: 15 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              992: { slidesPerView: 3, spaceBetween: 30 },
            }}
          >
            {testimonialData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="testimonial_card">
                  <div className="testimonial_card__img">
                    <img src={item.image} alt={item.name} />
                    <div className='text-center'>
                      <h5>{item.name}</h5>
                      <span>{item.designation}</span>
                    </div>
                  </div>
                  <div className="testimonial_card__content">
                    <h6><i className="fa-solid fa-quote-left"></i>{item.description}<i className="fa-solid fa-quote-right"></i></h6>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="row mt-5">
            {testimonialData.map((item) => (
              <div className="col-md-4 mb-4" key={item.id}>
                <div className="testimonial_card">
                  <div className="testimonial_card__img">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h5>{item.name}</h5>
                      <span>{item.designation}</span>
                    </div>
                  </div>
                  <div className="testimonial_card__content">
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
