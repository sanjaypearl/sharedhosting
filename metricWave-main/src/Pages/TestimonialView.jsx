import React ,{useEffect} from 'react'
import Testimonial from '../Component/Home/Testimonial'

const TestimonialView = () => {
  useEffect(() => {
        document.title = "Client Testimonials – MetricWave Insights";
        
        const metaDescription = document.querySelector("meta[name='description']");
        if (metaDescription) {
          metaDescription.setAttribute("content", "Hear how our market research and insights have empowered businesses worldwide.");
        } else {
          const meta = document.createElement('meta');
          meta.name = "description";
          meta.content = "Hear how our market research and insights have empowered businesses worldwide.";
          document.head.appendChild(meta);
        }
      }, []);
  return (
    <Testimonial type="grid" />
  )
}

export default TestimonialView