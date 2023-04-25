import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const FeedbackForm = () => {
  const form = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (containsHTML(message)) {
      setErrorMessage('Please do not include HTML or JavaScript in your message');
      return;
    }
    emailjs
      .sendForm(
        'service_dvc0b7n',
        'template_qg676dg',
        form.current,
        '8r51Ds_KLD4thxTHR'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
    setErrorMessage('');
  };

  const containsHTML = (string) => {
    const htmlTags = /(<([^>]+)>)/gi;
    const jsCode = /(console\.[\w]+\(\))/gi;
    return htmlTags.test(string) || jsCode.test(string);
  };

  return (
    <section>
      <div className="container d-flex justify-content-center my-4">
        <form className="card p-3" onSubmit={sendEmail} ref={form}>
          <h2 className="text-center">Contact Us</h2>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="user_name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="user_email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              className="form-control"
              id="subject"
              name="subject"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              cols="40"
              rows="8"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default FeedbackForm;
