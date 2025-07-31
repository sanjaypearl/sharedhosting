import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { BASE_URL } from '../utils/api';

const PressDetails = () => {
    const { slug } = useParams(); // Getting slug from URL
    const [pressData, setPressData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPressDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/press-release-detail/${slug}`);
                const data = await response.json();

                // Check if 'pressRelease' exists in response
                setPressData(data.pressRelease || null);
            } catch (error) {
                console.error('Error fetching press release details:', error);
                setPressData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPressDetails();
    }, [slug]);

 if (loading) return (
  <div className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);
    if (!pressData) return <p>Press release not found.</p>;

    const { name, description, created_at, image } = pressData;

    return (
        <section className="press_details">
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex page_breadcrumbs">
                            <Link to="/" className="">
                                Home /
                            </Link>
                            <Link to="/press-release" className="">
                                Press Release /
                            </Link>
                            <p className='breadcrumb_data'>{name}</p>
                        </div>
                        {/* <Breadcrumbs breadcrumbs={BreadcrumbData}/> */}
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center flex-wrap my-3 gap-3">
                        <div className="title-bar border-0 p-0">{name}</div>
                        <p className="text-muted m-0">
                            Published On: <strong>{new Date(created_at).toLocaleDateString()}</strong>
                        </p>
                        {/* <div className="d-flex gap-2">
                            <button className="btn btn-green">Get Instant Access - Buy Now</button>
                            <button className="btn btn-blue">Request Sample</button>
                        </div> */}
                    </div>
                </div>

                <div className="col-md-12 _details_row">
                    <div className="row">
                        <div className="col-12">
                            <div className='_ad_press_image text-center'>
                                <img src={image} alt={name} className="img-fluid mb-3" />
                            </div>
                            <p>{parse(description)}</p>
                        </div>
                    </div>
                </div>

            </div>
    </section >
  );
};

export default PressDetails;
