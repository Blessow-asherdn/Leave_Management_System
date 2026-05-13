const MyLeavesTable = ({ leaves }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-black text-white">
          <tr>
            <th className="text-left p-4">
              Leave Type
            </th>

            <th className="text-left p-4">
              Reason
            </th>

            <th className="text-left p-4">
              From
            </th>

            <th className="text-left p-4">
              To
            </th>

            <th className="text-left p-4">
              Status
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
                {leave.leaveType}
              </td>

              <td className="p-4">
                {leave.reason}
              </td>

              <td className="p-4">
                {new Date(
                  leave.fromDate
                ).toLocaleDateString()}
              </td>

              <td className="p-4">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyLeavesTable;