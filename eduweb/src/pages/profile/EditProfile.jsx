import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { userInfo, token, setUserInfo } = useAuthStore();
  const [formData, setFormData] = useState({
    fullname: userInfo.fullname || "",
    username: userInfo.username || "",
    email: userInfo.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize form data when userInfo changes
    setFormData({
      fullname: userInfo.fullname || "",
      username: userInfo.username || "",
      email: userInfo.email || "",
    });
  }, [userInfo]);

  const userId =
    userInfo._id || JSON.parse(localStorage.getItem("userInfo")).id;
  console.log("🚀 ~ handleSubmit ~ userId:", userId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!userId) {
      setLoading(false);
      setError("User ID is missing.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/auth/profile/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

        // Update user info in the store and localStorage
      setUserInfo(
        response.data.token,
        response.data.user.role,
        response.data.user
      );
      toast.success("Profile Updated Successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        error.response?.data?.msg ||
          "Failed to update profile. Please try again."
      );
      toast.error("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] mx-auto my-8">
      <h1 className="text-xl font-bold mb-4">Edit Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
