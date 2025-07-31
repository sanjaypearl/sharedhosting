import React, { useState, useEffect } from "react";

const Carousel = () => {
  // Picsum image IDs to use
  const imageIds = [237, 238, 239, 240, 241];

  // Generate URLs dynamically
  const images = imageIds.map(
    (id) => `https://picsum.photos/id/${id}/800/400`
  );

  return (
    // <div
    //   id="carouselExampleAutoplaying"
    //   className="carousel slide"
    //   data-bs-ride="carousel"
    // >
    //   <div className="carousel-inner">
    //     {images.map((url, index) => (
    //       <div
    //         key={url}
    //         className={`carousel-item ${index === 0 ? "active" : ""}`}
    //       >
    //         <img src={url} className="d-block w-100" alt={`Slide ${index + 1}`} />
    //         <div className="carousel-caption d-none d-md-block">
    //           <h5>Image {index + 1}</h5>
    //           <p>22858 reports across 100+ industry segments exhaustively covered.</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   <button
    //     className="carousel-control-prev"
    //     type="button"
    //     data-bs-target="#carouselExampleAutoplaying"
    //     data-bs-slide="prev"
    //   >
    //     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Previous</span>
    //   </button>

    //   <button
    //     className="carousel-control-next"
    //     type="button"
    //     data-bs-target="#carouselExampleAutoplaying"
    //     data-bs-slide="next"
    //   >
    //     <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Next</span>
    //   </button>
    // </div>
    // <video src="https://cdn.shopify.com/videos/c/o/v/9d23868108ee40d29369c2fb4fee8e11.mp4" loop="" autoplay="" muted="muted" playsinline="" controlslist="nodownload" className="video_banner"></video>


       <div
  id="carouselExampleAutoplaying"
  className="carousel slide"
  data-bs-ride="carousel"
>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="Images/main_banner.webp" className="d-block w-100" alt="Slide 1" />
      {/* <div className="carousel-caption d-none d-md-block">
        <h5>Precise market intelligence and advisory.</h5>
        <p>22858 reports across 100+ industry segments exhaustively covered.</p>
        <button className="submit_btn">Get In Touch</button>
      </div> */}
    </div>
  </div>

  {/* <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExampleAutoplaying"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>

  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleAutoplaying"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button> */}
</div>

  );
};

export default Carousel;
