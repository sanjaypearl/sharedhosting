import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaMinus, FaCheck } from 'react-icons/fa';

const GDPRBox = () => {
  const [showBox, setShowBox] = useState(false);       // Bottom cookie box
  const [showModal, setShowModal] = useState(false);   // Centered modal
  const show = ""

  const [settings, setSettings] = useState({
    marketing: false,
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    const isAccepted = localStorage.getItem('gdprAccepted');
    if (!isAccepted) {
      setShowBox(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gdprAccepted', 'true');
    setShowBox(false);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowBox(false);
    setShowModal(true);
  };

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      {/* Bottom GDPR Box */}
      {showBox && (
        <div className="gdpr-box">
          <p>
            We use cookies to ensure that we give you the best experience on our website.
            By continuing to use our site, you accept our{' '}
            <a href="/privacy-policies" target="_blank" rel="noopener noreferrer">Privacy Policy</a> /{' '}
            <a href="/gdpr-policy" target="_blank" rel="noopener noreferrer">GDPR Policy</a>.
          </p>
          <div className="gdpr-buttons">
            <button className="gdpr-btn cancel" onClick={handleCancel}>Cookie Setting</button>
            <button onClick={handleAccept} className="gdpr-btn accept">Accept</button>
          </div>
        </div>
      )}

      {/* Centered Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg" className="gdpr-modal">
        <Modal.Header closeButton>
          <Modal.Title>Advanced Cookie Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="gdpr-section">
             <div className="d-flex flex-column">
            <div className="gdpr-title">Essential Cookies</div>
            <p>These cookies enable core functionality such as security, verification of identity and network management. These cookies can’t be disabled.</p>
            </div>
            <div className="gdpr-toggle disabled">
              <FaCheck />
            </div>
          </div>

          <div className="gdpr-section">
            <div className="d-flex flex-column">
                <div className="gdpr-title">Enable Marketing Cookies</div>
                <p>These cookies are used to track advertising effectiveness to provide a more relevant service and deliver better ads to suit your interests.</p>
            </div>
            <div className="gdpr-toggle" onClick={() => toggleSetting('marketing')}>
              {settings.marketing ? <FaCheck /> : <FaMinus />}
            </div>
          </div>

          <div className="gdpr-section">
             <div className="d-flex flex-column">
            <div className="gdpr-title">Enable Functional Cookies</div>
            <p>These cookies collect data to remember choices users make to improve and give a more personalised experience.</p>
            </div>
            <div className="gdpr-toggle" onClick={() => toggleSetting('functional')}>
              {settings.functional ? <FaCheck /> : <FaMinus />}
            </div>
          </div>

          <div className="gdpr-section">
             <div className="d-flex flex-column">
            <div className="gdpr-title">Enable Analytics Cookies</div>
            <p>These cookies help us to understand how you interact with our website, discover errors, and improve our user experience.</p>
            </div>
            <div className="gdpr-toggle" onClick={() => toggleSetting('analytics')}>
              {settings.analytics ? <FaCheck /> : <FaMinus />}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAccept} className="main_btn">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GDPRBox;
