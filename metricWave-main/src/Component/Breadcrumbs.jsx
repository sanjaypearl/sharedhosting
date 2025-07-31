import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <div className="d-flex page_breadcrumbs">
      {breadcrumbs.map((crumb, index) => (
        <span key={index} className="breadcrumb-item">
          {crumb.link ? (
            <Link to={crumb.link} className={crumb.className || ''}>
              {crumb.label} 
            </Link>
          ) : (
            <p className={crumb.className || 'details-page-name'}>{crumb.label}</p>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
