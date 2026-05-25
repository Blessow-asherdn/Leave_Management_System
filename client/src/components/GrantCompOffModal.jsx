import { useState } from "react";

const GrantCompOffModal = ({
  isOpen,
  onClose,
  onGrant,
  employee,
}) => {
  const [days, setDays] =
    useState("");

  const [reason, setReason] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !days ||
      Number(days) <= 0
    ) {
      return;
    }

    onGrant({
      days:
        Number(days),
      reason,
    });

    setDays("");

    setReason("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-black">
              Grant Comp Off
            </h2>

            <p className="text-gray-500 mt-1">
              {
                employee?.name
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
              Comp Off Days
            </label>

            <input
              type="number"
              min="1"
              value={days}
              onChange={(e) =>
                setDays(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter days"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block mb-2 font-semibold text-black">
              Reason
            </label>

            <textarea
              value={reason}
              onChange={(e) =>
                setReason(
                  e.target.value
                )
              }
              rows="4"
              placeholder="Optional reason"
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
              className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
            >
              Grant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GrantCompOffModal;