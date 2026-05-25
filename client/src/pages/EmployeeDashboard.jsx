import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import DashboardLayout from "../layouts/DashboardLayout";

import ApplyLeaveForm from "../components/ApplyLeaveForm";

import MyLeavesTable from "../components/MyLeavesTable";

import {
  applyLeave,
  getMyLeaves,
  getMyLeaveBalance,
} from "../services/leaveService";

const EmployeeDashboard = () => {

  const [leaves, setLeaves] =
    useState([]);

  const [leaveBalance,
    setLeaveBalance] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("All");

  const [leaveTypeFilter,
    setLeaveTypeFilter] =
    useState("All");

  const [dateFilter,
    setDateFilter] =
    useState("");

  const fetchLeaves = async () => {
    try {

      const response =
        await getMyLeaves();

      setLeaves(response.data);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch leaves"
      );

    }
  };

  const fetchLeaveBalance =
    async () => {
      try {

        const response =
          await getMyLeaveBalance();

        setLeaveBalance(
          response.data
        );

      } catch (error) {

        toast.error(
          "Failed to fetch leave balance"
        );

      }
    };

  const handleApplyLeave =
    async (data) => {

      try {

        setLoading(true);

        await applyLeave(data);

        toast.success(
          "Leave applied successfully"
        );

        fetchLeaves();

        fetchLeaveBalance();

      } catch (error) {

        const message =
          error.response?.data?.message;

        const suggestedLeaves =
          error.response?.data
            ?.suggestedLeaves;

        if (
          suggestedLeaves &&
          suggestedLeaves.length > 0
        ) {

          toast.warning(
            `${message}. You can apply using: ${suggestedLeaves.join(", ")}`
          );

        } else {

          toast.error(
            message ||
              "Failed to apply leave"
          );

        }

      } finally {

        setLoading(false);

      }
    };

  const filteredLeaves =
    leaves.filter((leave) => {

      const matchesSearch =
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

      const matchesType =
        leaveTypeFilter === "All"
          ? true
          : leave.leaveType ===
            leaveTypeFilter;

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
        matchesType &&
        matchesDate
      );
    });

  useEffect(() => {

    fetchLeaves();

    fetchLeaveBalance();

  }, []);

  return (
    <DashboardLayout>

      <div className="min-h-screen bg-gray-100 px-5 py-5">

        {/* HEADER */}

        <div className="bg-black text-white rounded-3xl px-8 py-7 shadow-sm mb-6">

          <h1 className="text-3xl font-semibold mb-1">
            Employee Dashboard
          </h1>

          <p className="text-gray-400 text-sm">
            Apply and manage your leave requests
          </p>

        </div>

        {/* LEAVE BALANCE CARDS */}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-gray-500 font-medium mb-2">
              Sick Leave
            </p>

            <h2 className="text-3xl font-semibold text-black">
              {
                leaveBalance
                  ?.sickLeave
                  ?.remaining || 0
              }
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-gray-500 font-medium mb-2">
              Casual Leave
            </p>

            <h2 className="text-3xl font-semibold text-black">
              {
                leaveBalance
                  ?.casualLeave
                  ?.remaining || 0
              }
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-gray-500 font-medium mb-2">
              Paid Leave
            </p>

            <h2 className="text-3xl font-semibold text-black">
              {
                leaveBalance
                  ?.paidLeave
                  ?.remaining || 0
              }
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-gray-500 font-medium mb-2">
              Comp Off
            </p>

            <h2 className="text-3xl font-semibold text-black">
              {
                leaveBalance
                  ?.compOff
                  ?.remaining || 0
              }
            </h2>
          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-gray-500 font-medium mb-2">
              Total Requests
            </p>

            <h2 className="text-3xl font-semibold text-black">
              {leaves.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-gray-500 font-medium mb-2">
              Pending
            </p>

            <h2 className="text-3xl font-semibold text-yellow-500">
              {
                leaves.filter(
                  (leave) =>
                    leave.status ===
                    "Pending"
                ).length
              }
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-gray-500 font-medium mb-2">
              Approved
            </p>

            <h2 className="text-3xl font-semibold text-green-600">
              {
                leaves.filter(
                  (leave) =>
                    leave.status ===
                    "Approved"
                ).length
              }
            </h2>
          </div>

        </div>

        {/* MAIN SECTION */}

        <div className="grid grid-cols-1 xl:grid-cols-[38%_62%] gap-5">

          {/* APPLY LEAVE */}

          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm h-fit">

            <h2 className="text-xl font-semibold text-black mb-5">
              Apply Leave
            </h2>

            <ApplyLeaveForm
              onApply={
                handleApplyLeave
              }
              loading={loading}
              leaveBalance={leaveBalance}
            />

          </div>

          {/* MY REQUESTS */}

          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-5">

              <div>

                <h2 className="text-xl font-semibold text-black">
                  My Leave Requests
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Track your leave history
                </p>

              </div>

              <span className="bg-black text-white px-4 py-2 rounded-xl text-xs font-medium w-fit">
                {filteredLeaves.length} Requests
              </span>

            </div>

            {/* FILTERS */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">

              <select
                value={leaveTypeFilter}
                onChange={(e) =>
                  setLeaveTypeFilter(
                    e.target.value
                  )
                }
                className="h-11 border border-gray-300 rounded-xl px-4 text-sm focus:outline-none"
              >
                <option value="All">
                  All Leave Types
                </option>

                <option value="Sick Leave">
                  Sick Leave
                </option>

                <option value="Casual Leave">
                  Casual Leave
                </option>

                <option value="Paid Leave">
                  Paid Leave
                </option>

                <option value="Comp Off">
                  Comp Off
                </option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="h-11 border border-gray-300 rounded-xl px-4 text-sm focus:outline-none"
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
                className="h-11 border border-gray-300 rounded-xl px-4 text-sm focus:outline-none"
              />

            </div>

            {/* TABLE */}

            <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">

              {filteredLeaves.length === 0 ? (

                <div className="text-center py-16 border border-dashed border-gray-300 rounded-2xl">

                  <h3 className="text-lg font-semibold text-black mb-2">
                    No Leave Requests
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Your leave requests will appear here
                  </p>

                </div>

              ) : (

                <MyLeavesTable
                  leaves={filteredLeaves}
                />

              )}

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default EmployeeDashboard;