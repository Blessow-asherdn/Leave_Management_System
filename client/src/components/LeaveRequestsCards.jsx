const LeaveRequestsCards = ({
  leaves,
  onUpdateStatus,
  updatingLeaveId,
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

              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Admin Comment
                </p>

                <div className="bg-gray-100 rounded-xl p-3 text-sm text-gray-800 break-words">
                  {leave.adminComment ||
                    "No comment added"}
                </div>
              </div>
            </div>

            <div className="lg:w-auto flex lg:justify-end">
              {leave.status ===
              "Pending" ? (
                <button
                  onClick={() =>
                    onUpdateStatus(
                      leave
                    )
                  }
                  disabled={
                    updatingLeaveId ===
                    leave._id
                  }
                  className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
                >
                  {updatingLeaveId ===
                  leave._id
                    ? "Updating..."
                    : "Take Action"}
                </button>
              ) : (
                <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-xl text-sm font-medium">
                  Completed
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveRequestsCards;