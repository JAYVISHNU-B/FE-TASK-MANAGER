import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { toast } from 'react-toastify'; // Import toast for error/success messages

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    const payload = { email, password };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/api/auth/login`, payload); 
      localStorage.setItem('token', response.data.token);
      onLogin(response.data.user);
      // Navigate to the kanban board page
      navigate("/kanban");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Login failed!');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Navigate to ForgotPasswordPage
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
        <h2 className="font-bold text-lg mb-4">Login</h2>
        
        <input
          type="email" // Email field for user login
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Login
        </button>

        <div className="mt-4 text-center">
          <button 
            type="button" 
            onClick={handleForgotPassword} 
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
