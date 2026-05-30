import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import {
  getNotifications,
} from "../services/notificationService";

const DashboardLayout = ({
  children,
}) => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    user,
    logout,
  } = useContext(
    AuthContext
  );

  const [
    unreadCount,
    setUnreadCount,
  ] = useState(0);

  useEffect(() => {

    const fetchUnreadCount =
      async () => {

        try {

          const notifications =
            await getNotifications();

          const unread =
            notifications.filter(
              (
                notification
              ) =>
                !notification.isRead
            ).length;

          setUnreadCount(
            unread
          );

        } catch (error) {

          console.log(
            "Notification count error",
            error
          );

        }

      };

    if (user) {

      fetchUnreadCount();

    }

  }, [
    user,
    location.pathname,
  ]);

  const handleLogout =
    () => {

      logout();

      navigate("/");
    };

  const isAdmin =
    user?.role === "admin";

  const navItems = isAdmin
    ? [
        {
          label: "Dashboard",
          path:
            "/admin/dashboard",
        },

        {
          label: "Users",
          path:
            "/admin/users",
        },

        {
          label: "Leaves",
          path:
            "/admin/leaves",
        },

        {
          label:
            "Notifications",
          path:
            "/admin/notifications",
        },
      ]
    : [
        {
          label:
            "Dashboard",
          path:
            "/employee",
        },

        {
          label:
            "Notifications",
          path:
            "/employee/notifications",
        },
      ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      <aside className="w-[270px] bg-white border-r border-gray-200 flex flex-col">

        <div className="px-6 py-6 border-b border-gray-200">

          <h1 className="text-2xl font-bold text-black">
            {isAdmin
              ? "Admin Panel"
              : "Employee Panel"}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Leave Management
          </p>

        </div>

        <div className="flex-1 p-4 space-y-3">

          {navItems.map(
            (item) => (

              <Link
                key={
                  item.path
                }
                to={
                  item.path
                }
                className={`flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  location.pathname ===
                  item.path
                    ? "bg-black text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >

                <span>
                  {
                    item.label
                  }
                </span>

                {item.label ===
                  "Notifications" &&
                  unreadCount >
                    0 && (

                    <div className="min-w-[24px] h-[24px] rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold">

                      {
                        unreadCount
                      }

                    </div>

                  )}

              </Link>

            )
          )}

        </div>

        <div className="border-t border-gray-200 p-5">

          <div className="mb-5">

            <p className="text-2xl font-bold text-black">
              {user?.name}
            </p>

            <p className="text-sm text-gray-500 capitalize mt-1">
              {user?.role}
            </p>

          </div>

          <button
            onClick={
              handleLogout
            }
            className="w-full bg-black text-white py-4 rounded-2xl text-sm font-semibold hover:bg-gray-800 transition"
          >
            Logout
          </button>

        </div>

      </aside>

      <main className="flex-1 overflow-y-auto p-5">

        {children}

      </main>

    </div>
  );
};

export default DashboardLayout;