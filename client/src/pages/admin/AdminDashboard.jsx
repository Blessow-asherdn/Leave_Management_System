import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  Users,
  Clock3,
  CheckCircle2,
  UserCheck,
} from "lucide-react";

import StatCard from "../../components/dashboard/StatCard";

import LeaveOverview from "../../components/dashboard/LeaveOverview";

import LeaveTrend from "../../components/dashboard/LeaveTrend";

import RecentActivity from "../../components/dashboard/RecentActivity";

import UpcomingLeaves from "../../components/dashboard/UpcomingLeaves";

import {
  getAllUsers,
} from "../../services/userService";

import {
  getAllLeaves,
} from "../../services/leaveService";

import {
  getNotifications,
} from "../../services/notificationService";

const AdminDashboard =
  () => {

    const [users,
      setUsers] =
      useState([]);

    const [leaves,
      setLeaves] =
      useState([]);

    const [
      notifications,
      setNotifications,
    ] = useState([]);

    const fetchData =
      async () => {

        try {

          const [
            usersRes,
            leavesRes,
            notificationsRes,
          ] = await Promise.all([
            getAllUsers(),
            getAllLeaves(),
            getNotifications(),
          ]);

          setUsers(
            usersRes.data
          );

          setLeaves(
            leavesRes.data
          );

          setNotifications(
            notificationsRes.data
          );

        } catch (error) {

          console.log(error);

        }
      };

    useEffect(() => {

      fetchData();

    }, []);

    const pendingLeaves =
      leaves.filter(
        (leave) =>
          leave.status ===
          "Pending"
      );

    const approvedLeaves =
      leaves.filter(
        (leave) =>
          leave.status ===
          "Approved"
      );

    const activeEmployees =
      users.filter(
        (user) =>
          user.isActive
      );

    return (
      <DashboardLayout>

        <div className="space-y-6">

          {/* HEADER */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl px-8 py-7 text-white shadow-sm">

            <h1 className="text-3xl font-bold mb-2">
              Dashboard Overview
            </h1>

            <p className="text-blue-100 text-sm">
              Monitor employees and leave activities
            </p>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

            <StatCard
              title="Total Users"
              value={
                users.length
              }
              color="bg-blue-100 text-blue-600"
              icon={
                <Users size={26} />
              }
            />

            <StatCard
              title="Pending Leaves"
              value={
                pendingLeaves.length
              }
              color="bg-orange-100 text-orange-600"
              icon={
                <Clock3 size={26} />
              }
            />

            <StatCard
              title="Approved Leaves"
              value={
                approvedLeaves.length
              }
              color="bg-green-100 text-green-600"
              icon={
                <CheckCircle2
                  size={26}
                />
              }
            />

            <StatCard
              title="Active Employees"
              value={
                activeEmployees.length
              }
              color="bg-purple-100 text-purple-600"
              icon={
                <UserCheck
                  size={26}
                />
              }
            />

          </div>

          {/* SECOND ROW */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            <LeaveOverview
              leaves={leaves}
            />

            <UpcomingLeaves
              leaves={leaves}
            />

          </div>

          {/* THIRD ROW */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            <LeaveTrend
              leaves={leaves}
            />

            <RecentActivity
              notifications={
                notifications
              }
            />

          </div>

        </div>

      </DashboardLayout>
    );
  };

export default AdminDashboard;