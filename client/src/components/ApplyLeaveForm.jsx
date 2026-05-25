import { useState } from "react";

import { toast } from "react-toastify";

const ApplyLeaveForm = ({
  onApply,
  loading,
}) => {
  const [formData, setFormData] =
    useState({
      leaveType:
        "Casual Leave",

      fromDate: "",

      toDate: "",

      reason: "",
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

    const today = new Date()
      .toISOString()
      .split("T")[0];

    if (
      formData.fromDate < today
    ) {
      return toast.error(
        "Start date cannot be in the past"
      );
    }

    if (
      formData.toDate <
      formData.fromDate
    ) {
      return toast.error(
        "End date cannot be before start date"
      );
    }

    if (
      formData.reason.trim()
        .length < 5
    ) {
      return toast.error(
        "Reason must contain at least 5 characters"
      );
    }

    onApply(formData);

    setFormData({
      leaveType:
        "Casual Leave",

      fromDate: "",

      toDate: "",

      reason: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-black font-semibold mb-2">
          Leave Type
        </label>

        <select
          name="leaveType"
          value={
            formData.leaveType
          }
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="Casual Leave">
            Casual Leave
          </option>

          <option value="Sick Leave">
            Sick Leave
          </option>

          <option value="Paid Leave">
            Paid Leave
          </option>

          <option value="Comp Off">
            Comp Off
          </option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-black font-semibold mb-2">
            From Date
          </label>

          <input
            type="date"
            name="fromDate"
            value={
              formData.fromDate
            }
            onChange={handleChange}
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            required
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-black font-semibold mb-2">
            To Date
          </label>

          <input
            type="date"
            name="toDate"
            value={
              formData.toDate
            }
            onChange={handleChange}
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            required
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-black font-semibold mb-2">
          Leave Reason
        </label>

        <textarea
          name="reason"
          placeholder="Enter leave reason"
          value={formData.reason}
          onChange={handleChange}
          rows="4"
          maxLength={200}
          required
          className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
        />

        <p className="text-sm text-gray-500 mt-2">
          {
            formData.reason
              .length
          }
          /200 characters
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`px-8 py-4 rounded-xl text-white font-semibold transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        {loading
          ? "Applying..."
          : "Apply Leave"}
      </button>
    </form>
  );
};

export default ApplyLeaveForm;