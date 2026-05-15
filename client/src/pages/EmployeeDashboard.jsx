import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../layouts/DashboardLayout";
import ApplyLeaveForm from "../components/ApplyLeaveForm";
import MyLeavesTable from "../components/MyLeavesTable";
import {applyLeave,getMyLeaves} from "../services/leaveService";

const EmployeeDashboard = () => {
  const [leaves, setLeaves] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

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

  const handleApplyLeave = async (
    data
  ) => {
    try {
      setLoading(true);

      await applyLeave(data);

      toast.success(
        "Leave applied successfully"
      );

      fetchLeaves();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to apply leave"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="bg-black text-white rounded-3xl p-10 shadow-xl mb-8">
          <h1 className="text-5xl font-bold mb-3">
            Employee Dashboard
          </h1>

          <p className="text-gray-300 text-lg">
            Apply and manage your leave
            requests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-500 mb-3">
              Total Leaves
            </h2>

            <p className="text-5xl font-bold text-black">
              {leaves.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-500 mb-3">
              Pending
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

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-500 mb-3">
              Approved
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

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-500 mb-3">
              Rejected
            </h2>

            <p className="text-5xl font-bold text-black">
              {
                leaves.filter(
                  (leave) =>
                    leave.status ===
                    "Rejected"
                ).length
              }
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">
            Apply Leave
          </h2>

          <ApplyLeaveForm
            onApply={
              handleApplyLeave
            }
            loading={loading}
          />
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black">
              My Leave Requests
            </h2>

            <span className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium">
              {leaves.length} Requests
            </span>
          </div>

          {leaves.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gray-300 rounded-2xl">
              <h3 className="text-2xl font-semibold text-black mb-2">
                📄 No Leave Requests
              </h3>

              <p className="text-gray-500">
                Your leave requests will
                appear here
              </p>
            </div>
          ) : (
            <MyLeavesTable
              leaves={leaves}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;