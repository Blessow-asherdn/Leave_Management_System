import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import UsersTable from "../../components/UsersTable";

import CreateUserForm from "../../components/CreateUserForm";

import {
  getAllUsers,
  createUser,
  toggleUserStatus,
} from "../../services/userService";

import { toast } from "react-toastify";

const UsersPage = () => {

  const [users, setUsers] =
    useState([]);

  const [isModalOpen,
    setIsModalOpen] =
    useState(false);

  const [creatingUser,
    setCreatingUser] =
    useState(false);

  const [deactivatingId,
    setDeactivatingId] =
    useState(null);

  const [search,
    setSearch] =
    useState("");

  const fetchUsers =
    async () => {

      const response =
        await getAllUsers();

      setUsers(response.data);
    };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers =
    users.filter((user) =>
      user.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      user.email
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const handleCreateUser =
    async (data) => {

      try {

        setCreatingUser(true);

        await createUser(data);

        toast.success(
          "User created successfully"
        );

        fetchUsers();

        setIsModalOpen(false);

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message
        );

      } finally {

        setCreatingUser(false);

      }
    };

  const handleToggle =
  async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to activate/deactivate this user?"
      );

    if (!confirmed) {
      return;
    }

    try {

      setDeactivatingId(id);

      await toggleUserStatus(id);

      fetchUsers();

      toast.success(
        "User status updated successfully"
      );

    } catch (error) {

      toast.error(
        "Failed to update user"
      );

    } finally {

      setDeactivatingId(null);

    }
  };

  return (
    <DashboardLayout>

      <div className="min-h-screen bg-gray-100 p-5">

        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">

          <div className="flex items-center justify-between mb-5">

            <div>

              <h1 className="text-2xl font-semibold text-black">
                User Management
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Manage employees and admins
              </p>

            </div>

            <button
              onClick={() =>
                setIsModalOpen(true)
              }
              className="bg-black text-white px-5 py-3 rounded-2xl text-sm font-medium hover:bg-gray-800 transition"
            >
              + Create User
            </button>

          </div>

          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full h-11 border border-gray-300 rounded-2xl px-4 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <div className="rounded-2xl overflow-hidden border border-gray-200">

            <UsersTable
              users={filteredUsers}
              onToggleStatus={
                handleToggle
              }
              deactivatingId={
                deactivatingId
              }
            />

          </div>

        </div>

        {isModalOpen && (

          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-5">

            <div className="bg-white rounded-3xl w-full max-w-2xl p-7 shadow-xl">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-2xl font-semibold text-black">
                    Create User
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Add employee or admin
                  </p>

                </div>

                <button
                  onClick={() =>
                    setIsModalOpen(false)
                  }
                  className="text-gray-500 hover:text-black text-xl"
                >
                  ✕
                </button>

              </div>

              <CreateUserForm
                onCreate={
                  handleCreateUser
                }
                loading={
                  creatingUser
                }
              />

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
};

export default UsersPage;