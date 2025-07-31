import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { BASE_URL } from '../utils/api';
// import Breadcrumbs from '../Component/Breadcrumbs';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  //   const BreadcrumbData = [
  //     { label: 'Home', link: '/' },
  //     { label: 'Blog', link: '/blog' },
  //     { label: name, link: `/blog-detail/${slug}`, className: 'details-page-name' }
  //   ];
  useEffect(() => {
    const fetchPressDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/blog-detail/${slug}`);
        const data = await response.json();

        // Check if 'blog' exists in response
        setBlogData(data.blog || null);
      } catch (error) {
        console.error('Error fetching press release details:', error);
        setBlogData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPressDetails();
  }, [slug]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  if (!blogData) return <p>Blog Detail not found.</p>;

  const { name, description, created_at, image } = blogData;

  return (
    <section className="press_details">
      <div className="container my-4">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex page_breadcrumbs">
              <Link to="/" className="">
                Home /
              </Link>
              <Link to="/blog" className="">
                Blog /
              </Link>
              <p className='breadcrumb_data'>{name}</p>
            </div>
            {/* <Breadcrumbs breadcrumbs={BreadcrumbData}/> */}
          </div>
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-start my-3 ">
              <div className="d-flex flex-column">
                <div className="title-bar border-0 p-0 w-75">{name}</div>
              </div>
              <div className="d-flex gap-2">
                <p className="text-muted m-0">
                  Published On:<strong>{new Date(created_at).toLocaleDateString()}</strong>
                </p>
                {/* <button className="btn btn-green">Get Instant Access - Buy Now</button>
                <button className="btn btn-blue">Request Sample</button> */}
              </div>
            </div>
          </div>

          <div className="col-md-12 _details_row">
            <div className="row">
              <div className="col-md-12">
                <div className='_ad_press_image text-center'>
                  <img src={image} alt={name} className="img-fluid mb-3" />
                </div>
                <p className='paragraph_content'>{parse(description)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
