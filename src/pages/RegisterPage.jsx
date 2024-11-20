import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;
    const payload = { name, email, password };

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", payload);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Registration failed!');
    }

    // Clear form data after submission
    setFormData({
      name: '',
      email: '',
      password: ''
    });

    alert('Registration successful!');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow w-1/3" onSubmit={handleSubmit}>
        <h2 className="font-bold text-lg mb-4">Register</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <input
          type="email"
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

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
