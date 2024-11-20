import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/auth/forgot-password", { email })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Forgot Password</h2>

        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitButton}>Send</button>
      </form>

      <button style={styles.linkButton}>
        <Link to={"/login"} style={styles.linkText}>Back to Login</Link>
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f3f4f6",
  },
  form: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  heading: {
    marginBottom: "1.5rem",
    fontSize: "1.8rem",
    color: "#333",
  },
  inputGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "1rem",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  submitButton: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#3b82f6",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "1rem",
  },
  linkButton: {
    marginTop: "1.5rem",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  linkText: {
    color: "#3b82f6",
    textDecoration: "none",
    fontSize: "1rem",
  },
};

// Add hover effects
styles.input["&:focus"] = {
  borderColor: "#3b82f6",
};

styles.submitButton["&:hover"] = {
  backgroundColor: "#2563eb",
};

styles.linkText["&:hover"] = {
  textDecoration: "underline",
};

export default ForgotPassword;