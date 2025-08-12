import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const EmailForm = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendStatus(null);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setSendStatus("success");
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          setSendStatus("error");
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="email-form">
      <h2>Contact Us</h2>
      
      {/* Status Messages */}
      {sendStatus === "success" && (
        <div className="alert success">Message sent successfully! 🎉</div>
      )}
      {sendStatus === "error" && (
        <div className="alert error">Failed to send. Please try again. ❌</div>
      )}

      <form ref={form} onSubmit={sendEmail}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="your@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows="5"
            placeholder="Your message..."
          />
        </div>

        <button type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Send Message"}
        </button>
      </form>

      <style jsx>{`
        .email-form {
          max-width: 500px;
          margin: 0 auto;
          padding: 2rem;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333;
        }
        .form-group {
          margin-bottom: 1.2rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #444;
        }
        input,
        textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        textarea {
          min-height: 120px;
        }
        button {
          width: 100%;
          padding: 0.8rem;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s;
        }
        button:hover {
          background: #4338ca;
        }
        button:disabled {
          background: #a5b4fc;
          cursor: not-allowed;
        }
        .alert {
          padding: 0.8rem;
          margin-bottom: 1rem;
          border-radius: 4px;
          text-align: center;
        }
        .success {
          background: #d1fae5;
          color: #065f46;
        }
        .error {
          background: #fee2e2;
          color: #b91c1c;
        }
      `}</style>
    </div>
  );
};