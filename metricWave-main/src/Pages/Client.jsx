import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/api';

const Client = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/company`);
        const data = await response.json();
        if (response.ok && data.companys) {
          setCompanies(data.companys);
        }
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      <div className="breadcrumb mb-4 p-3 d-flex justify-content-between align-items-center">
        <div>
          <Link to="/"> <i className="fas fa-home"></i></Link>
        </div>
        <h4><strong>Trusted Clients</strong></h4>
        <div></div>
      </div>

      <section className="clients_logo">
        <div className="container">
          <div className="row">
            {companies.map((company) => (
              <div className="col-md-2 col-4 mb-4" key={company.id}>
                <div className="client-logo">
                  <img src={company.image} alt={`Client ${company.id}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Client;
