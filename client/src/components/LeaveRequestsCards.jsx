const LeaveRequestsCards = ({
  leaves,
  onUpdateStatus,
  onRevoke,
}) => {

  return (
    <div className="space-y-3">

      {leaves.map((leave) => (

        <div
          key={leave._id}
          className="bg-white rounded-2xl shadow-md border border-gray-200 p-3"
        >

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3">

            <div className="flex-1">

              <div className="flex flex-wrap items-center gap-3 mb-3">

                <h2 className="text-lg font-semibold text-black">

                  {
                    leave.employee
                      ?.name
                  }

                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    leave.status ===
                    "Approved"
                      ? "bg-green-100 text-green-700"
                      : leave.status ===
                        "Rejected"
                      ? "bg-red-100 text-red-700"
                      : leave.status ===
                        "Revoked"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >

                  {leave.status}

                </span>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">

                <div>

                  <p className="text-xs text-gray-500 mb-1">

                    Leave Type

                  </p>

                  <p className="text-sm font-medium text-black">

                    {leave.leaveType}

                  </p>

                </div>

                <div>

                  <p className="text-xs text-gray-500 mb-1">

                    Dates

                  </p>

                  <p className="text-sm font-medium text-black">

                    {new Date(
                      leave.fromDate
                    ).toLocaleDateString()}

                    {" - "}

                    {new Date(
                      leave.toDate
                    ).toLocaleDateString()}

                  </p>

                </div>

              </div>

              <div className="mb-3">

                <p className="text-xs text-gray-500 mb-1">

                  Leave Reason

                </p>

                <div className="bg-gray-100 rounded-xl p-3 text-sm text-gray-800 leading-relaxed break-words">

                  {leave.reason}

                </div>

              </div>

              <div className="mb-3">

                <p className="text-xs text-gray-500 mb-1">

                  Admin Comment

                </p>

                <div className="bg-gray-100 rounded-xl p-3 text-sm text-gray-800 break-words">

                  {
                    leave.adminComment ||
                    "No comment added"
                  }

                </div>

              </div>

              {
                leave.leaveBreakdown && (

                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">

                    <p className="text-xs text-blue-700 font-semibold mb-2">

                      Leave Breakdown

                    </p>

                    <div className="flex flex-wrap gap-2 text-xs">

                      {
                        Object.entries(
                          leave.leaveBreakdown
                        )
                          .filter(
                            ([, value]) =>
                              value > 0
                          )
                          .map(
                            (
                              [key, value]
                            ) => (

                              <div
                                key={key}
                                className="bg-white px-3 py-1 rounded-lg border border-blue-100"
                              >

                                {key}: {value}

                              </div>
                            )
                          )
                      }

                    </div>

                  </div>

                )
              }

            </div>

            <div className="lg:w-auto flex flex-col gap-2">

              {
                leave.status ===
                "Pending" && (

                  <button
                    onClick={() =>
                      onUpdateStatus(
                        leave
                      )
                    }
                    className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
                  >

                    Take Action

                  </button>

                )
              }

              {
                leave.status !==
                  "Revoked" && (

                  <button
                    onClick={() =>
                      onRevoke(
                        leave._id
                      )
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-700 transition"
                  >

                    Revoke

                  </button>

                )
              }

            </div>

          </div>

        </div>

      ))}

    </div>
  );
};

export default LeaveRequestsCards;