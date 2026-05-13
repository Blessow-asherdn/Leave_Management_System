import { useState } from "react";

const CreateUserForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onCreate(formData);

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "employee",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md mb-8"
    >
      <h2 className="text-2xl font-bold mb-6">
        Create User
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-3"
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
        className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Create User
      </button>
    </form>
  );
};

export default CreateUserForm;