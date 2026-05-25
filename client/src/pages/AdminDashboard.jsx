import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateUserForm from "../components/CreateUserForm";
import UsersTable from "../components/UsersTable";
import LeaveRequestsCards from "../components/LeaveRequestsCards";
import {getAllUsers,createUser,toggleUserStatus} from "../services/userService";
import {getAllLeaves,updateLeaveStatus,getAllLeaveBalances,updateLeaveBalance,grantCompOff,} from "../services/leaveService";
import LeaveBalanceTable from "../components/LeaveBalanceTable";
import UpdateBalanceModal from "../components/UpdateBalanceModal";
import GrantCompOffModal from "../components/GrantCompOffModal";
import LeaveActionModal from "../components/LeaveActionModal";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const [leaves, setLeaves] = useState([]);

  const [creatingUser, setCreatingUser] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState(null);

  const [updatingLeaveId, setUpdatingLeaveId] = useState(null);

  const [balances, setBalances] = useState([]);

  const [isModalOpen,setIsModalOpen] = useState(false);

  const [selectedEmployee,setSelectedEmployee] = useState(null);

  const [selectedBalance, setSelectedBalance] = useState(null);

  const [isCompOffModalOpen,setIsCompOffModalOpen] = useState(false);

  const [selectedCompEmployee,setSelectedCompEmployee] = useState(null);

  const [isLeaveModalOpen,setIsLeaveModalOpen] =  useState(false);

  const [selectedLeave,setSelectedLeave] = useState(null);

  const [searchTerm, setSearchTerm] =  useState("");

  const [statusFilter, setStatusFilter] =  useState("All");

  const [dateFilter, setDateFilter] = useState("");

  const [userSearch, setUserSearch] =  useState("");

  const [roleFilter, setRoleFilter] =  useState("All");

  const [statusUserFilter,setStatusUserFilter,] = useState("All");

  const [balanceSearch,setBalanceSearch,] = useState("");

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

  const fetchBalances =
  async () => {
    try {
      const response =
        await getAllLeaveBalances();

      setBalances(
        response.data
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to fetch leave balances"
      );
    }
  };

  const filteredLeaves =
    leaves.filter((leave) => {
      const matchesSearch =
        leave.employee?.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        leave.leaveType
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All"
          ? true
          : leave.status ===
            statusFilter;

      const leaveFromDate =
        new Date(
          leave.fromDate
        )
          .toISOString()
          .split("T")[0];

      const leaveToDate =
        new Date(
          leave.toDate
        )
          .toISOString()
          .split("T")[0];

      const matchesDate =
        !dateFilter ||
        leaveFromDate ===
          dateFilter ||
        leaveToDate ===
          dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDate
      );
    });

    const filteredUsers =
  users.filter((user) => {

    const matchesSearch =
      user.name
        ?.toLowerCase()
        .includes(
          userSearch.toLowerCase()
        ) ||
      user.email
        ?.toLowerCase()
        .includes(
          userSearch.toLowerCase()
        );

    const matchesRole =
      roleFilter === "All"
        ? true
        : user.role ===
          roleFilter;

    const matchesStatus =
      statusUserFilter ===
      "All"
        ? true
        : statusUserFilter ===
          "Active"
        ? user.isActive
        : !user.isActive;

    return (
      matchesSearch &&
      matchesRole &&
      matchesStatus
    );
  });

  const filteredBalances =
  balances.filter((balance) => {

    const employeeName =
      balance.employee?.name
        ?.toLowerCase() || "";

    const employeeEmail =
      balance.employee?.email
        ?.toLowerCase() || "";

    return (
      employeeName.includes(
        balanceSearch.toLowerCase()
      ) ||
      employeeEmail.includes(
        balanceSearch.toLowerCase()
      )
    );
  });

    const handleCreateUser = async (
      data
    ) => {
      try {
        setCreatingUser(true);

        await createUser(data);

        toast.success(
          "User created successfully"
        );

        await fetchUsers();
        await fetchBalances();
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

  const handleUpdateBalance =
  (employeeId) => {
    const balance =
      balances.find(
        (b) =>
          b.employee._id ===
          employeeId
      );

    setSelectedEmployee(
      balance.employee
    );

    setSelectedBalance(
      balance
    );

    setIsModalOpen(true);
  };

  const handleSaveBalance =
  async (data) => {
    try {
      await updateLeaveBalance(
        selectedEmployee._id,
        {
          sickLeave:
            Number(
              data.sickLeave
            ),

          casualLeave:
            Number(
              data.casualLeave
            ),

          paidLeave:
            Number(
              data.paidLeave
            ),

          compOff:
            Number(
              data.compOff
            ),
        }
      );

      toast.success(
        "Leave balance updated successfully"
      );

      fetchBalances();

      setIsModalOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to update balance"
      );
    }
  };

  const handleGrantCompOff =
  (employeeId) => {
    const balance =
      balances.find(
        (b) =>
          b.employee._id ===
          employeeId
      );

    setSelectedCompEmployee(
      balance.employee
    );

    setIsCompOffModalOpen(
      true
    );
  };

  const handleSubmitCompOff =
  async (data) => {
    try {
      await grantCompOff(
        selectedCompEmployee._id,
        data.days
      );

      toast.success(
        "Comp Off granted successfully"
      );

      fetchBalances();

      setIsCompOffModalOpen(
        false
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to grant comp off"
      );
    }
  };

const handleUpdateLeaveStatus =
  (leave) => {
    setSelectedLeave(
      leave
    );

    setIsLeaveModalOpen(
      true
    );
  };

  const handleSubmitLeaveAction =
  async (data) => {
    try {
      setUpdatingLeaveId(
        selectedLeave._id
      );

      await updateLeaveStatus(
        selectedLeave._id,
        data.status,
        data.adminComment
      );

      toast.success(
        `Leave ${data.status.toLowerCase()} successfully`
      );

      fetchLeaves();

      fetchBalances();

      setIsLeaveModalOpen(
        false
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to update leave"
      );
    } finally {
      setUpdatingLeaveId(null);
    }
  };

  useEffect(() => {
    fetchUsers();

    fetchLeaves();

    fetchBalances();
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen bg-gray-100 px-5 py-5">

        <div className="bg-black text-white rounded-xl px-8 py-6 mb-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-center mb-1">
            Admin Dashboard
          </h1>

          <p className="text-center text-gray-400 text-sm">
            Manage users and leave requests
          </p>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">

          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
            <h2 className="text-sm font-medium text-gray-500 mb-2">
              Total Users
            </h2>

            <p className="text-2xl font-semibold text-black">
              {users.length}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
            <h2 className="text-sm font-medium text-gray-500 mb-2">
              Active Users
            </h2>

            <p className="text-2xl font-semibold text-black">
              {
                users.filter(
                  (user) =>
                    user.isActive
                ).length
              }
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
            <h2 className="text-sm font-medium text-gray-500 mb-2">
              Pending Leaves
            </h2>

            <p className="text-2xl font-semibold text-black">
              {
                leaves.filter(
                  (leave) =>
                    leave.status ===
                    "Pending"
                ).length
              }
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
            <h2 className="text-sm font-medium text-gray-500 mb-2">
              Approved Leaves
            </h2>

            <p className="text-2xl font-semibold text-black">
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

        <div className="grid grid-cols-1 xl:grid-cols-[40%_60%] gap-5 mb-6 items-stretch">

          <div className="w-full bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-6 shadow-sm h-[520px] flex flex-col relative overflow-hidden">
            <h2 className="text-2xl font-bold text-black mb-2 relative z-10">
              Create User
            </h2>
            
            <p className="text-sm text-gray-600 mb-6 relative z-10">
               Add employees and admins to the system
            </p>
            <br></br>
            <br></br>
            <CreateUserForm
              onCreate={
                handleCreateUser
              }
              loading={
                creatingUser
              }
            />
          </div>

          <div className="w-full bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col h-[520px]">

            <div className="mb-5">

              <h2 className="text-2xl font-semibold text-black mb-2">
                User Management
              </h2>

              <p className="text-sm text-gray-500">
                Manage employees and administrators
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 mb-5">

              <input
                type="text"
                placeholder="Search by name or email..."
                value={userSearch}
                onChange={(e) =>
                  setUserSearch(
                    e.target.value
                  )
                }
                className="flex-1 h-10 border border-gray-300 rounded-2xl px-4 text-sm text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
              />

              <select
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(
                    e.target.value
                  )
                }
                className="h-10 w-[140px] border border-gray-300 rounded-2xl px-3 text-sm text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
              >
                <option value="All">
                  All Roles
                </option>

                <option value="employee">
                  Employee
                </option>

                <option value="admin">
                  Admin
                </option>
              </select>

              <select
                value={statusUserFilter}
                onChange={(e) =>
                  setStatusUserFilter(
                    e.target.value
                  )
                }
                className="h-10 w-[150px] border border-gray-300 rounded-2xl px-3 text-sm text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
              >
                <option value="All">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

            </div>
            

            {users.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                No Users Found
              </div>
            ) : (
              <div className="flex-1 pr-1 rounded-2xl border border-gray-200 overflow-hidden">

                <UsersTable
                  users={filteredUsers}
                  onToggleStatus={
                    handleToggleUserStatus
                  }
                  deactivatingId={
                    deactivatingId
                  }
                />

              </div>
            )}

          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[42%_58%] gap-5 items-stretch">

          <div className="w-full bg-white border border-gray-200 rounded-2xl p-5 shadow-sm h-[760px] overflow-hidden flex flex-col">

            <div className="mb-4">

              <h2 className="text-lg font-semibold text-black mb-3">
                Leave Balances
              </h2>

              <input
                type="text"
                placeholder="Search employee name or email..."
                value={balanceSearch}
                onChange={(e) =>
                  setBalanceSearch(
                    e.target.value
                  )
                }
                className="w-full h-10 border border-gray-300 rounded-xl px-4 text-sm text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition"
              />

            </div>
            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">

              <LeaveBalanceTable
                balances={filteredBalances}
                onUpdate={
                  handleUpdateBalance
                }
                onGrantCompOff={
                  handleGrantCompOff
                }
              />

            </div>

          </div>

          <div className="w-full bg-white border border-gray-200 rounded-2xl p-5 shadow-sm h-[760px] overflow-hidden flex flex-col">

            <div className="flex flex-col gap-4 mb-4">

              <h2 className="text-lg font-semibold text-black">
                Leave Requests
              </h2>

              <div className="flex flex-wrap gap-3">

                <input
                  type="text"
                  placeholder="Search employee or leave type..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                  className="h-9 flex-1 min-w-[240px] border border-gray-300 rounded-xl px-4 text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="h-9 w-[150px] border border-gray-300 rounded-xl px-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <option value="All">
                    All Status
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Approved">
                    Approved
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>
                </select>

                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) =>
                    setDateFilter(
                      e.target.value
                    )
                  }
                  className="h-9 w-[170px] border border-gray-300 rounded-xl px-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
            </div>

            {leaves.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                No Leave Requests Found
              </div>
            ) : (
              <div className="max-h-[650px] overflow-y-auto pr-2">
                <LeaveRequestsCards
                  leaves={
                    filteredLeaves
                  }
                  onUpdateStatus={
                    handleUpdateLeaveStatus
                  }
                  updatingLeaveId={
                    updatingLeaveId
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <UpdateBalanceModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onSave={
          handleSaveBalance
        }
        employee={
          selectedEmployee
        }
        currentBalance={
          selectedBalance
        }
      />

      <GrantCompOffModal
        isOpen={
          isCompOffModalOpen
        }
        onClose={() =>
          setIsCompOffModalOpen(
            false
          )
        }
        onGrant={
          handleSubmitCompOff
        }
        employee={
          selectedCompEmployee
        }
      />

      <LeaveActionModal
        isOpen={
          isLeaveModalOpen
        }
        onClose={() =>
          setIsLeaveModalOpen(
            false
          )
        }
        onSubmit={
          handleSubmitLeaveAction
        }
        leave={selectedLeave}
      />
    </DashboardLayout>
  );
};

export default AdminDashboard;