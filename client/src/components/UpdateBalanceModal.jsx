import { useEffect, useState } from "react";

const UpdateBalanceModal = ({
  isOpen,
  onClose,
  onSave,
  employee,
  currentBalance,
}) => {

  const [formData, setFormData] =
    useState({
      sickLeave: 0,
      casualLeave: 0,
      paidLeave: 0,
      compOff: 0,
    });

  useEffect(() => {

    if (currentBalance) {

      setFormData({
        sickLeave:
          currentBalance
            ?.sickLeave?.total || 0,

        casualLeave:
          currentBalance
            ?.casualLeave?.total || 0,

        paidLeave:
          currentBalance
            ?.paidLeave?.total || 0,

        compOff:
          currentBalance
            ?.compOff?.total || 0,
      });

    }

  }, [currentBalance]);

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          Number(e.target.value),
      });
    };

  const handleSubmit =
    (e) => {

      e.preventDefault();

      onSave(formData);
    };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

      <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-3xl font-bold text-black">
              Update Leave Balance
            </h2>

            <p className="text-gray-500 text-lg mt-1">
              {employee?.name}
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-black"
          >
            ×
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-2 gap-5 mb-8">

            <div>

              <label className="block text-lg font-semibold mb-2">
                Sick Leave
              </label>

              <input
                type="number"
                name="sickLeave"
                value={
                  formData.sickLeave
                }
                onChange={
                  handleChange
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg"
              />

            </div>

            <div>

              <label className="block text-lg font-semibold mb-2">
                Casual Leave
              </label>

              <input
                type="number"
                name="casualLeave"
                value={
                  formData.casualLeave
                }
                onChange={
                  handleChange
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg"
              />

            </div>

            <div>

              <label className="block text-lg font-semibold mb-2">
                Paid Leave
              </label>

              <input
                type="number"
                name="paidLeave"
                value={
                  formData.paidLeave
                }
                onChange={
                  handleChange
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg"
              />

            </div>

            <div>

              <label className="block text-lg font-semibold mb-2">
                Comp Off
              </label>

              <input
                type="number"
                name="compOff"
                value={
                  formData.compOff
                }
                onChange={
                  handleChange
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg"
              />

            </div>

          </div>

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-gray-300 text-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-black text-white text-lg"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default UpdateBalanceModal;  