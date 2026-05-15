import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateUserForm from "../components/CreateUserForm";
import UsersTable from "../components/UsersTable";
import LeaveRequestsTable from "../components/LeaveRequestsTable";
import {getAllUsers,createUser,toggleUserStatus} from "../services/userService";
import {getAllLeaves,updateLeaveStatus} from "../services/leaveService";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const [leaves, setLeaves] = useState([]);

  const [creatingUser, setCreatingUser] =
    useState(false);

  const [deactivatingId, setDeactivatingId] =
    useState(null);

  const [updatingLeaveId, setUpdatingLeaveId] =
    useState(null);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();

      setUsers(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch users"
      );
    }
  };

  const fetchLeaves = async () => {
    try {
      const response = await getAllLeaves();

      setLeaves(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch leave requests"
      );
    }
  };

  const handleCreateUser = async (
    data
  ) => {
    try {
      setCreatingUser(true);

      await createUser(data);

      toast.success(
        "User created successfully"
      );

      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create user"
      );
    } finally {
      setCreatingUser(false);
    }
  };

  const handleToggleUserStatus =
    async (id) => {
      try {
        setDeactivatingId(id);

        await toggleUserStatus(id);

        toast.success(
          "User status updated successfully"
        );

        fetchUsers();
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong"
        );
      } finally {
        setDeactivatingId(null);
      }
  };

  const handleUpdateLeaveStatus =
    async (id, status) => {
      try {
        setUpdatingLeaveId(id);

        await updateLeaveStatus(
          id,
          status
        );

        toast.success(
          `Leave ${status.toLowerCase()} successfully`
        );

        fetchLeaves();
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to update leave"
        );
      } finally {
        setUpdatingLeaveId(null);
      }
    };

  useEffect(() => {
    fetchUsers();

    fetchLeaves();
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen bg-white px-6 py-8">
        <div className="bg-black text-white rounded-2xl p-10 mb-8 shadow-lg">
          <h1 className="text-5xl font-bold text-center mb-4">
            Admin Dashboard
          </h1>

          <p className="text-center text-gray-300 text-lg">
            Manage users and leave
            requests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-md">
            <h2 className="text-black text-lg font-bold mb-4">
              Total Users
            </h2>

            <p className="text-5xl font-bold text-black">
              {users.length}
            </p>
          </div>

          <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-md">
            <h2 className="text-black text-lg font-bold mb-4">
              Active Users
            </h2>

            <p className="text-5xl font-bold text-black">
              {
                users.filter(
                  (user) => user.isActive
                ).length
              }
            </p>
          </div>

          <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-md">
            <h2 className="text-black text-lg font-bold mb-4">
              Pending Leaves
            </h2>

            <p className="text-5xl font-bold text-black">
              {
                leaves.filter(
                  (leave) =>
                    leave.status ===
                    "Pending"
                ).length
              }
            </p>
          </div>

          <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-md">
            <h2 className="text-black text-lg font-bold mb-4">
              Approved Leaves
            </h2>

            <p className="text-5xl font-bold text-black">
              {
                leaves.filter(
                  (leave) =>
                    leave.status ===
                    "Approved"
                ).length
              }
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-black rounded-2xl p-8 mb-10 shadow-md">
          <h2 className="text-3xl font-bold text-black mb-6">
            Create User
          </h2>

          <CreateUserForm
            onCreate={handleCreateUser}
            loading={creatingUser}
          />
        </div>

        <div className="bg-white border-2 border-black rounded-2xl p-8 mb-10 shadow-md">
          <h2 className="text-3xl font-bold text-black mb-6">
            User Management
          </h2>

          {users.length === 0 ? (
            <div className="text-center py-10 text-black text-xl font-medium">
              No Users Found
            </div>
          ) : (
            <UsersTable
              users={users}
              onToggleStatus={
                handleToggleUserStatus
              }
              deactivatingId={
                deactivatingId
              }
            />
          )}
        </div>

        <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-md">
          <h2 className="text-3xl font-bold text-black mb-6">
            Leave Requests
          </h2>

          {leaves.length === 0 ? (
            <div className="text-center py-10 text-black text-xl font-medium">
              No Leave Requests Found
            </div>
          ) : (
            <LeaveRequestsTable
              leaves={leaves}
              onUpdateStatus={
                handleUpdateLeaveStatus
              }
              updatingLeaveId={
                updatingLeaveId
              }
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;