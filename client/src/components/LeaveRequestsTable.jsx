const LeaveRequestsTable = ({
  leaves,
  onUpdateStatus,
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
              Status
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
              <td className="p-4">
                {leave.employee?.name}
              </td>

              <td className="p-4">
                {leave.leaveType}
              </td>

              <td className="p-4">
                {new Date(
                  leave.fromDate
                ).toLocaleDateString()}
                {" - "}
                {new Date(
                  leave.toDate
                ).toLocaleDateString()}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
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

              <td className="p-4 flex gap-2">
                {leave.status ===
                  "Pending" && (
                  <>
                    <button
                      onClick={() =>
                        onUpdateStatus(
                          leave._id,
                          "Approved"
                        )
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        onUpdateStatus(
                          leave._id,
                          "Rejected"
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </>
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