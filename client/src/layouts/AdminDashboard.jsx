import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import CreateUserForm from "../components/CreateUserForm";

import UsersTable from "../components/UsersTable";

import {getAllUsers,createUser,deactivateUser} from "../services/userService";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateUser = async (data) => {
    try {
      await createUser(data);

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeactivateUser = async (id) => {
    try {
      await deactivateUser(id);

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">
            Total Employees
          </h2>

          <p className="text-3xl mt-4 font-bold">
            {users.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">
            Active Users
          </h2>

          <p className="text-3xl mt-4 font-bold">
            {
              users.filter(
                (user) => user.isActive
              ).length
            }
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">
            Inactive Users
          </h2>

          <p className="text-3xl mt-4 font-bold">
            {
              users.filter(
                (user) => !user.isActive
              ).length
            }
          </p>
        </div>
      </div>

      <CreateUserForm
        onCreate={handleCreateUser}
      />

      <UsersTable
        users={users}
        onDeactivate={handleDeactivateUser}
      />
    </DashboardLayout>
  );
};

export default AdminDashboard;