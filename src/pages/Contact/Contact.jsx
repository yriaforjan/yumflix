import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { sendContactForm } from "../../services/formSpree";
import "./Contact.css";

const Contact = () => {
  const [status, setStatus] = useState("idle"); // idle | success | error

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (status !== "idle") {
      const timer = setTimeout(() => {
        setStatus("idle");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const onSubmit = async (data) => {
    setStatus("idle");
    const success = await sendContactForm(data);
    setStatus(success ? "success" : "error");
    if (success) reset();
  };

  return (
    <main className="page-container page-padding contact-page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Drop us a message and we'll get back to you soon.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            {...register("name", { required: true })}
            placeholder="Enter your name"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            placeholder="example@mail.com"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            {...register("message", { required: true })}
            rows="5"
            placeholder="How can we help you?"
            disabled={isSubmitting}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="form-message success">
            Message sent successfully! We'll contact you soon.
          </p>
        )}
        {status === "error" && (
          <p className="form-message error">
            Something went wrong. Please try again later.
          </p>
        )}
      </form>
    </main>
  );
};

export default Contact;
