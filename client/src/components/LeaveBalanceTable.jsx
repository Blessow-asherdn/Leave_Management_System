const LeaveBalanceTable = ({
  balances,
  onUpdate,
  onGrantCompOff,
}) => {
  return (
    <div className="flex flex-col gap-4">

      {balances.map((balance) => (
        <div
          key={balance._id}
          className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
        >

          <div className="flex items-start justify-between gap-4 mb-4">

            <div>
              <h3 className="text-lg font-semibold text-black">
                {
                  balance.employee
                    ?.name
                }
              </h3>

              <p className="text-sm text-gray-500">
                {
                  balance.employee
                    ?.email
                }
              </p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() =>
                  onUpdate(
                    balance.employee._id
                  )
                }
                className="bg-black text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition"
              >
                Update
              </button>

              <button
                onClick={() =>
                  onGrantCompOff(
                    balance.employee._id
                  )
                }
                className="bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-green-700 transition"
              >
                Comp Off
              </button>

            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">
                Sick Leave
              </p>

              <p className="text-lg font-semibold text-black">
                {
                  balance
                    .sickLeave
                    .remaining
                }
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">
                Casual Leave
              </p>

              <p className="text-lg font-semibold text-black">
                {
                  balance
                    .casualLeave
                    .remaining
                }
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">
                Paid Leave
              </p>

              <p className="text-lg font-semibold text-black">
                {
                  balance
                    .paidLeave
                    .remaining
                }
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">
                Comp Off
              </p>

              <p className="text-lg font-semibold text-black">
                {
                  balance
                    .compOff
                    .remaining
                }
              </p>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveBalanceTable;