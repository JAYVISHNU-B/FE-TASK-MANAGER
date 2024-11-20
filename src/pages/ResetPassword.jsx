import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useParams to access URL params
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { userId, token } = useParams(); // Capture userId and token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/auth/reset-password/${userId}/${token}`,
        { password }
      );
      toast.success(response.data.status);
      navigate('/login'); // Redirect to login after successful password reset
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.status || 'Password reset failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Reset Password</h2>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
            New Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter New Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Reset Password
        </button>
      </form>

      <div className="mt-6">
        <button className="text-blue-600 hover:underline">
          <a href="/login">Back to Login</a>
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
