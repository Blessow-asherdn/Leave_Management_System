const LeaveBalanceTable = ({
  balances,
  onUpdate,
  onGrantCompOff,
}) => {

  if (
    !balances ||
    balances.length === 0
  ) {
    return (
      <div className="text-center text-gray-500 py-10">
        No leave balances found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">

      {balances.map(
        (balance, index) => (

          <div
            key={
              balance._id ||
              index
            }
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
          >

            <div className="flex items-start justify-between gap-4 mb-5">

              <div>

                <h3 className="text-xl font-semibold text-black">

                  {typeof balance.employee ===
                  "object"
                    ? balance.employee
                        ?.name
                    : "Employee"}

                </h3>

                <p className="text-sm text-gray-500">

                  {typeof balance.employee ===
                  "object"
                    ? balance.employee
                        ?.email
                    : "No Email"}

                </p>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() =>
                    onUpdate(
                      balance
                    )
                  }
                  className="bg-black text-white px-4 py-2 rounded-xl text-sm"
                >
                  Update
                </button>

                <button
                  onClick={() =>
                    onGrantCompOff(
                      balance
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm"
                >
                  Comp Off
                </button>

              </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="bg-gray-100 rounded-xl p-4">

                <p className="text-sm text-gray-500 mb-1">
                  Sick Leave
                </p>

                <h2 className="text-2xl font-bold">
                  {
                    balance
                      ?.sickLeave
                      ?.remaining || 0
                  }
                </h2>

              </div>

              <div className="bg-gray-100 rounded-xl p-4">

                <p className="text-sm text-gray-500 mb-1">
                  Casual Leave
                </p>

                <h2 className="text-2xl font-bold">
                  {
                    balance
                      ?.casualLeave
                      ?.remaining || 0
                  }
                </h2>

              </div>

              <div className="bg-gray-100 rounded-xl p-4">

                <p className="text-sm text-gray-500 mb-1">
                  Paid Leave
                </p>

                <h2 className="text-2xl font-bold">
                  {
                    balance
                      ?.paidLeave
                      ?.remaining || 0
                  }
                </h2>

              </div>

              <div className="bg-gray-100 rounded-xl p-4">

                <p className="text-sm text-gray-500 mb-1">
                  Comp Off
                </p>

                <h2 className="text-2xl font-bold">
                  {
                    balance
                      ?.compOff
                      ?.remaining || 0
                  }
                </h2>

              </div>

            </div>

          </div>
        )
      )}

    </div>
  );
};

export default LeaveBalanceTable;