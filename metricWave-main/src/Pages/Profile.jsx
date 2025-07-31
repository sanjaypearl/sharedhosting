import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';

const Profile = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      <section className="_main_profile my-5">
        <div className="container">
          <div className="user_profile">
            <div className="profile_img">
              <img
                src="https://travl.dexignlab.com/react/demo/static/media/cover.ac8967da7e0fc0123d02.jpg"
                alt="Profile"
              />
            </div>
            <div className="profile_content_section">
              <div className="profile_detail">
                <div className="detail_item">
                  <p>Name</p>
                  <h5 className='user_name'>Ashish Verma</h5>
                </div>
                <div className="d-flex gap-3 align-items-center">
                  <div className="detail_item">
                    <p>Email</p>
                    <h5 className='user_email'>ashishvemra@gmail.xcom</h5>
                  </div>
                  <div className="detail_item">
                    <p>Phone Number</p>
                    <h5 className='user_number'>0123456789</h5>
                  </div>
                </div>
                <div className="detail_item">
                  <p>Address</p>
                  <h5 className='user_address'>Dhamawala, Dehradun (Uttrakhand), India</h5>
                </div>
              </div>
              <div className="profile_edit_btn">
                <Button className='profile_btn me-2' onClick={handleShow}>Profile Edit</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Offcanvas show={show} onHide={handleClose} {...props} placement='end' className='profile_offcanvas'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Profile Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Your Correct Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text" placeholder="Enter Your Correct Number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Country</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select Country</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>State</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select State</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select City</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter Your Address" />
            </Form.Group>
          </Form>
          <Button className='profile_btn' onClick={handleClose}>
            Submit
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Profile;
