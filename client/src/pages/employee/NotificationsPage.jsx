import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getNotifications,
  markAsRead,
} from "../../services/notificationService";

const NotificationsPage = () => {

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    fetchNotifications();

  }, []);

  const fetchNotifications =
    async () => {

      try {

        const data =
          await getNotifications();

        setNotifications(data);

        for (const notification of data) {

          if (
            !notification.isRead
          ) {

            await markAsRead(
              notification._id
            );

          }

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  return (
    <DashboardLayout>

      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm min-h-[500px]">

        <div className="mb-6">

          <h1 className="text-3xl font-bold text-black">
            Notifications
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Recent activity
          </p>

        </div>

        {loading ? (

          <div className="text-gray-500">
            Loading...
          </div>

        ) : notifications.length === 0 ? (

          <div className="text-gray-500">
            No notifications found
          </div>

        ) : (

          <div className="space-y-4">

            {notifications.map(
              (
                notification
              ) => (

                <div
                  key={
                    notification._id
                  }
                  className="border border-gray-200 rounded-2xl p-5"
                >

                  <h2 className="text-lg font-semibold text-black">
                    {
                      notification.title
                    }
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {
                      notification.message
                    }
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(
                      notification.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
};

export default NotificationsPage;