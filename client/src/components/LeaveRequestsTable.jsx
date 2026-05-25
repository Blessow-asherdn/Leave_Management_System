const LeaveRequestsTable = ({
  leaves,
  onUpdateStatus,
  updatingLeaveId,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-black text-white">
          <tr>
            <th className="text-left p-4">
              Employee
            </th>

            <th className="text-left p-4">
              Leave Type
            </th>

            <th className="text-left p-4">
              Dates
            </th>

            <th className="text-left p-4">
              Reason
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Admin Comment
            </th>

            <th className="text-left p-4">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave) => (
            <tr
              key={leave._id}
              className="border-b"
            >
              <td className="p-4 font-medium text-black">
                {
                  leave.employee
                    ?.name
                }
              </td>

              <td className="p-4 text-black">
                {leave.leaveType}
              </td>

              <td className="p-4 text-black">
                {new Date(
                  leave.fromDate
                ).toLocaleDateString()}
                {" - "}
                {new Date(
                  leave.toDate
                ).toLocaleDateString()}
              </td>

              <td className="p-4 text-gray-700 max-w-xs break-words">
                {leave.reason}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
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
              </td>

              <td className="p-4 text-gray-700 max-w-xs">
                {leave.adminComment ||
                  "-"}
              </td>

              <td className="p-4">
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
                    className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                  >
                    {updatingLeaveId ===
                    leave._id
                      ? "Updating..."
                      : "Take Action"}
                  </button>
                ) : (
                  <span className="text-gray-400 text-sm">
                    Completed
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequestsTable;