const UsersTable = ({
  users,
  onToggleStatus,
  deactivatingId,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col border border-gray-200">

      {/* Header */}
      <table className="w-full table-fixed">
        <thead className="bg-black text-white">
          <tr>

            <th className="w-[18%] text-left px-5 py-4 text-sm font-semibold">
              Name
            </th>

            <th className="w-[30%] text-left px-5 py-4 text-sm font-semibold">
              Email
            </th>

            <th className="w-[15%] text-left px-5 py-4 text-sm font-semibold">
              Role
            </th>

            <th className="w-[15%] text-left px-5 py-4 text-sm font-semibold">
              Status
            </th>

            <th className="w-[22%] text-left px-5 py-4 text-sm font-semibold">
              Actions
            </th>

          </tr>
        </thead>
      </table>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden max-h-[350px]">

        <table className="w-full table-fixed">
          <tbody>

            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >

                {/* Name */}
                <td className="w-[18%] px-5 py-5 text-sm font-medium text-black truncate">
                  {user.name}
                </td>

                {/* Email */}
                <td className="w-[30%] px-5 py-5 text-sm text-gray-700 truncate">
                  {user.email}
                </td>

                {/* Role */}
                <td className="w-[15%] px-5 py-5 text-sm capitalize text-black">
                  {user.role}
                </td>

                {/* Status */}
                <td className="w-[15%] px-5 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                {/* Action */}
                <td className="w-[22%] px-5 py-5">

                  <button
                    onClick={() =>
                      onToggleStatus(
                        user._id
                      )
                    }
                    disabled={
                      deactivatingId ===
                      user._id
                    }
                    className={`min-w-[120px] px-4 py-2 rounded-xl text-xs text-white font-semibold transition ${
                      user.isActive
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } ${
                      deactivatingId ===
                      user._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {deactivatingId ===
                    user._id
                      ? "Updating..."
                      : user.isActive
                      ? "Deactivate"
                      : "Activate"}
                  </button>

                </td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>

    </div>
  );
};

export default UsersTable;