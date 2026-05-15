const UsersTable = ({
  users,
  onToggleStatus,
  deactivatingId,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-black text-white">
          <tr>
            <th className="text-left p-4">
              Name
            </th>

            <th className="text-left p-4">
              Email
            </th>

            <th className="text-left p-4">
              Role
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
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b"
            >
              <td className="p-4">
                {user.name}
              </td>

              <td className="p-4">
                {user.email}
              </td>

              <td className="p-4 capitalize">
                {user.role}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
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

              <td className="p-4">
                <button
                  onClick={() =>
                    onToggleStatus(user._id)
                  }
                  disabled={
                    deactivatingId === user._id
                  }
                  className={`px-4 py-2 rounded-xl text-white font-medium transition ${
                    user.isActive
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  } ${
                    deactivatingId === user._id
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {deactivatingId === user._id
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
  );
};

export default UsersTable;