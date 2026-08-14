import { useState } from 'react';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page">
      <h2>Contact</h2>
      {submitted ? (
        <p>Thanks for reaching out! (This is a practice form — no data is sent anywhere.)</p>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <input type="text" placeholder="Your name" required />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
}

export default Contact;
