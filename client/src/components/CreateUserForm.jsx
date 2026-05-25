import { useState } from "react";

import { toast } from "react-toastify";

const CreateUserForm = ({
  onCreate,
  loading,
}) => {
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "employee",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.password
        .length < 8
    ) {
      return toast.error(
        "Password must contain at least 8 characters"
      );
    }

    if (
      !/[A-Z]/.test(
        formData.password
      )
    ) {
      return toast.error(
        "At least one uppercase letter is required"
      );
    }

    if (
      !/[a-z]/.test(
        formData.password
      )
    ) {
      return toast.error(
        "At least one lowercase letter is required"
      );
    }

    if (
      !/[0-9]/.test(
        formData.password
      )
    ) {
      return toast.error(
        "At least one number is required"
      );
    }

    if (
      !/[@$!%*?&]/.test(
        formData.password
      )
    ) {
      return toast.error(
        "At least one special character is required"
      );
    }

    onCreate(formData);

    setFormData({
      name: "",

      email: "",

      password: "",

      role: "employee",
    });
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter secure password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
          >
            <option value="employee">
              Employee
            </option>

            <option value="admin">
              Admin
            </option>
          </select>
        </div>

      </div>

      <button
        type="submit"
        disabled={loading}
        className={`mt-6 w-full py-3 rounded-2xl text-sm font-semibold text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        {loading
          ? "Creating User..."
          : "Create User"}
      </button>

    </form>
  );
};

export default CreateUserForm;