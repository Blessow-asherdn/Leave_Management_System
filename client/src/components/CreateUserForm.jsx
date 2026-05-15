import { useState } from "react";

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
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl px-5 py-4 text-black text-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl px-5 py-4 text-black text-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl px-5 py-4 text-black text-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-5 py-4 text-black text-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="employee">
            Employee
          </option>

          <option value="admin">
            Admin
          </option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`mt-8 px-8 py-4 rounded-xl text-lg font-semibold text-white transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        {loading
          ? "Creating..."
          : "Create User"}
      </button>
    </form>
  );
};

export default CreateUserForm;