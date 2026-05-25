import { useState } from "react";

const LeaveActionModal = ({
  isOpen,
  onClose,
  onSubmit,
  leave,
}) => {
  const [status, setStatus] =
    useState("Approved");

  const [adminComment,
    setAdminComment] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      status,
      adminComment,
    });

    setAdminComment("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-black">
              Leave Action
            </h2>

            <p className="text-gray-500 mt-1">
              {
                leave?.employee
                  ?.name
              }
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-black">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="Approved">
                Approve
              </option>

              <option value="Rejected">
                Reject
              </option>
            </select>
          </div>

          <div className="mb-8">
            <label className="block mb-2 font-semibold text-black">
              Admin Comment
            </label>

            <textarea
              rows="4"
              value={adminComment}
              onChange={(e) =>
                setAdminComment(
                  e.target.value
                )
              }
              placeholder="Enter comment"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-gray-300 font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`px-6 py-3 rounded-xl text-white font-semibold ${
                status ===
                "Approved"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveActionModal;