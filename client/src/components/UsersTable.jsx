const UsersTable = ({
  users,
  onDeactivate,
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
                {user.isActive && (
                  <button
                    onClick={() =>
                      onDeactivate(user._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Deactivate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;