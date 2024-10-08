import React, { useState } from "react";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Contact.css";

import {  BsGithub, BsLinkedin } from "react-icons/bs";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!name || !email || !msg) {
        toast.error("Please provide all fields");
        setIsSubmitting(false);
        return;
      }

      const data = {
        access_key: `${process.env.REACT_APP_WEB3FORMS_ACCESS_KEY}`,
        name,
        email,
        message: msg,
        subject: `${name} sent a message from Website`,
      };
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitSuccessful(true);
        toast.success("Message sent successfully!");
        setName("");
        setEmail("");
        setMsg("");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitSuccessful(false);
    setName("");
    setEmail("");
    setMsg("");
  };

  return (
    <>
      <div className="contact" id="contact">
        <div className="card card0 border-0">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12">
              <div className="card1">
                <div className="row border-line">
                  <img
                    src="https://img.freepik.com/free-photo/hot-line-contact-us-call-center-search-interface_53876-124009.jpg?w=2000"
                    alt="contact"
                    className="image"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="card2 d-flex card border-0 px-4 py-5">
                <div className="row">
                  <div className="row">
                  <h6>
                      <a href="https://www.linkedin.com/in/isha-maji-32a066253/" target="_blank" rel="noopener noreferrer">
                        <BsLinkedin color="blue" size={30} className="ms-4" />
                      </a>
                      <a href="https://github.com/ishsmaji" target="_blank" rel="noopener noreferrer">
                        <BsGithub color="black" size={30} className="ms-2" />
                      </a>
                    </h6>
                    <br/>
                  </div>

                  <div className="row px-3 mb-4">
                    <div className="line" />
                    <small className="or text-center">OR</small>
                    <div className="line" />
                  </div>
                  {!isSubmitSuccessful ? (
                    <form onSubmit={handleSubmit}>
                      <div className="row px-3">
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your Name"
                          className="mb-3"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="row px-3">
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter Your Email Address"
                          className="mb-3"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="row px-3">
                        <textarea
                          name="msg"
                          placeholder="Write your message"
                          className="mb-3"
                          value={msg}
                          onChange={(e) => setMsg(e.target.value)}
                          required
                        />
                      </div>
                      <div className="row px-3">
                        <button className="button" type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="success-message text-center">
                      <img src="Tick.png" alt="Success" className="tick-image mb-3" style={{ width: '100px', height: '100px' }} />
                      <h3>Thank you for your message!</h3>
                      <p>We'll get back to you soon.</p>
                      <button className="button mt-3" onClick={handleReset}>Send Another Message</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;