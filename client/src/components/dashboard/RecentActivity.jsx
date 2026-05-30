import React from "react";

import {
  Bell,
} from "lucide-react";

const RecentActivity = ({
  notifications = [],
}) => {

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-black">
          Recent Activity
        </h2>

        <p className="text-sm text-gray-500">
          Latest system actions
        </p>

      </div>

      <div className="space-y-5">

        {notifications.length === 0 ? (

          <div className="text-sm text-gray-500">
            No recent activity
          </div>

        ) : (

          notifications
            .slice(0, 5)
            .map(
              (
                notification,
                index
              ) => (
                <div
                  key={
                    notification._id ||
                    index
                  }
                  className="flex items-start gap-4"
                >

                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-blue-100 text-blue-600">

                    <Bell size={18} />

                  </div>

                  <div>

                    <h3 className="font-medium text-black">
                      {
                        notification.title
                      }
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {
                        notification.message
                      }
                    </p>

                  </div>

                </div>
              )
            )

        )}

      </div>

    </div>
  );
};

export default RecentActivity;