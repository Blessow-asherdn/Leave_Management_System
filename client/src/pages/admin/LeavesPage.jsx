import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import LeaveRequestsCards from "../../components/LeaveRequestsCards";

import LeaveBalanceTable from "../../components/LeaveBalanceTable";

import LeaveActionModal from "../../components/LeaveActionModal";

import UpdateBalanceModal from "../../components/UpdateBalanceModal";

import CompOffModal from "../../components/CompOffModal";

import {
  getAllLeaves,
  getAllLeaveBalances,
  updateLeaveStatus,
  updateLeaveBalance,
  grantCompOff,
  revokeLeave,
} from "../../services/leaveService";

import { toast } from "react-toastify";

const LeavesPage = () => {

  const [activeTab,
    setActiveTab] =
    useState("requests");

  const [search,
    setSearch] =
    useState("");

  const [leaveTypeFilter,
    setLeaveTypeFilter] =
    useState("");

  const [dateFilter,
    setDateFilter] =
    useState("");

  const [leaves,
    setLeaves] =
    useState([]);

  const [balances,
    setBalances] =
    useState([]);

  const [selectedLeave,
    setSelectedLeave] =
    useState(null);

  const [selectedEmployee,
    setSelectedEmployee] =
    useState(null);

  const [
    isActionModalOpen,
    setIsActionModalOpen,
  ] = useState(false);

  const [
    isBalanceModalOpen,
    setIsBalanceModalOpen,
  ] = useState(false);

  const [
    isCompOffModalOpen,
    setIsCompOffModalOpen,
  ] = useState(false);

  const fetchLeaves =
    async () => {

      try {

        const response =
          await getAllLeaves();

        const data =
          Array.isArray(response)
            ? response
            : response?.data || [];

        setLeaves(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        toast.error(
          "Failed to fetch leaves"
        );

      }
    };

  const fetchBalances =
  async () => {

    try {

      const response =
        await getAllLeaveBalances();


      setBalances(
        Array.isArray(response)
          ? response
          : response.data || []
      );

    } catch (error) {

      toast.error(
        "Failed to fetch balances"
      );

    }
  };

  useEffect(() => {

    fetchLeaves();

    fetchBalances();

  }, []);

  const filteredLeaves =
    Array.isArray(leaves)
      ? leaves.filter(
          (leave) => {

            const matchesSearch =
              leave.employee?.name
                ?.toLowerCase()
                .includes(
                  search.toLowerCase()
                );

            const matchesType =
              leaveTypeFilter ===
                "" ||
              leave.leaveType ===
                leaveTypeFilter;

            const matchesDate =
              dateFilter === "" ||
              new Date(
                leave.fromDate
              )
                .toISOString()
                .split("T")[0] ===
                dateFilter;

            return (
              matchesSearch &&
              matchesType &&
              matchesDate
            );
          }
        )
      : [];

const filteredBalances =
  Array.isArray(balances)
    ? balances.filter(
        (balance) => {

          if (
            !balance.employee
          ) {
            return true;
          }

          if (
            typeof balance.employee ===
            "string"
          ) {
            return true;
          }

          return (
            balance.employee?.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )
          );
        }
      )
    : [];

  const handleLeaveAction =
    async (data) => {

      try {

        await updateLeaveStatus(
          selectedLeave._id,
          data.status,
          data.adminComment
        );

        toast.success(
          "Leave updated successfully"
        );

        setIsActionModalOpen(
          false
        );

        fetchLeaves();

        fetchBalances();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to update leave"
        );

      }
    };

  const handleBalanceSave =
    async (data) => {

      try {

        await updateLeaveBalance(
          selectedEmployee.employee._id,
          data
        );

        toast.success(
          "Leave balance updated"
        );

        setIsBalanceModalOpen(
          false
        );

        fetchBalances();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to update balance"
        );

      }
    };

  const handleCompOff =
    async (data) => {

      try {

        await grantCompOff(
          selectedEmployee.employee._id,
          data
        );

        toast.success(
          "Comp Off granted"
        );

        setIsCompOffModalOpen(
          false
        );

        fetchBalances();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to grant Comp Off"
        );

      }
    };

  const handleRevokeLeave =
    async (leaveId) => {

      try {

        await revokeLeave(
          leaveId
        );

        toast.success(
          "Leave revoked"
        );

        fetchLeaves();

        fetchBalances();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to revoke leave"
        );

      }
    };

  return (
    <DashboardLayout>

      <div className="space-y-5">

        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">

          <h1 className="text-2xl font-bold text-black">
            Leave Management
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage leave requests and balances
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() =>
              setActiveTab(
                "requests"
              )
            }
            className={`px-5 py-3 rounded-2xl text-sm font-semibold transition ${
              activeTab ===
              "requests"
                ? "bg-black text-white"
                : "bg-white border border-gray-200 text-black"
            }`}
          >
            Leave Requests
          </button>

          <button
            onClick={() =>
              setActiveTab(
                "balances"
              )
            }
            className={`px-5 py-3 rounded-2xl text-sm font-semibold transition ${
              activeTab ===
              "balances"
                ? "bg-black text-white"
                : "bg-white border border-gray-200 text-black"
            }`}
          >
            Leave Balances
          </button>

        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm h-[72vh] flex flex-col">

          <div className="flex flex-wrap gap-3 mb-5">

            <input
              type="text"
              placeholder={`Search ${
                activeTab ===
                "requests"
                  ? "leave requests"
                  : "leave balances"
              }`}
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="flex-1 min-w-[220px] border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />

            {activeTab ===
              "requests" && (
              <>
                <select
                  value={
                    leaveTypeFilter
                  }
                  onChange={(e) =>
                    setLeaveTypeFilter(
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-2xl px-4 py-3"
                >
                  <option value="">
                    All Types
                  </option>

                  <option value="Casual Leave">
                    Casual Leave
                  </option>

                  <option value="Sick Leave">
                    Sick Leave
                  </option>

                  <option value="Paid Leave">
                    Paid Leave
                  </option>

                  <option value="Comp Off">
                    Comp Off
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
                  className="border border-gray-300 rounded-2xl px-4 py-3"
                />
              </>
            )}

          </div>

          <div className="flex-1 overflow-y-auto pr-2">

            {activeTab ===
            "requests" ? (

              <LeaveRequestsCards
                leaves={
                  filteredLeaves
                }
                onUpdateStatus={(
                  leave
                ) => {

                  setSelectedLeave(
                    leave
                  );

                  setIsActionModalOpen(
                    true
                  );
                }}
                onRevoke={
                  handleRevokeLeave
                }
              />

            ) : (

              <LeaveBalanceTable
                balances={
                  filteredBalances
                }
                onUpdate={(
                  balance
                ) => {

                  setSelectedEmployee(
                    balance
                  );

                  setIsBalanceModalOpen(
                    true
                  );
                }}
                onGrantCompOff={(
                  balance
                ) => {

                  setSelectedEmployee(
                    balance
                  );

                  setIsCompOffModalOpen(
                    true
                  );
                }}
              />

            )}

          </div>

        </div>

        <LeaveActionModal
          isOpen={
            isActionModalOpen
          }
          onClose={() =>
            setIsActionModalOpen(
              false
            )
          }
          onSubmit={
            handleLeaveAction
          }
          leave={selectedLeave}
        />

        <UpdateBalanceModal
          isOpen={
            isBalanceModalOpen
          }
          onClose={() =>
            setIsBalanceModalOpen(
              false
            )
          }
          onSave={
            handleBalanceSave
          }
          employee={
            selectedEmployee
              ?.employee
          }
          currentBalance={
            selectedEmployee
          }
        />

        <CompOffModal
          isOpen={
            isCompOffModalOpen
          }
          onClose={() =>
            setIsCompOffModalOpen(
              false
            )
          }
          onSubmit={
            handleCompOff
          }
          employee={
            selectedEmployee
              ?.employee
          }
        />

      </div>

    </DashboardLayout>
  );
};

export default LeavesPage;