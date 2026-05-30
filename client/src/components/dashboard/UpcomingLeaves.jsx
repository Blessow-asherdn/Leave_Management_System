import React from "react";

import { Calendar } from "lucide-react";

const UpcomingLeaves = ({
  leaves = [],
}) => {

  const today =
    new Date().toDateString();

  const todayLeaves =
    leaves.filter(
      (leave) =>
        new Date(
          leave.createdAt
        ).toDateString() ===
        today
    );

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm h-full">

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-black">
          Employees Applied Today
        </h2>

        <p className="text-sm text-gray-500">
          Today's leave applications
        </p>

      </div>

      <div className="space-y-4">

        {todayLeaves.length >
        0 ? (

          todayLeaves.map(
            (
              leave,
              index
            ) => (
              <div
                key={index}
                className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 hover:bg-gray-50 transition"
              >

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">

                    <Calendar size={20} />

                  </div>

                  <div>

                    <h3 className="font-medium text-black">
                      {
                        leave
                          .employee
                          ?.name
                      }
                    </h3>

                    <p className="text-sm text-gray-500">
                      {
                        leave.leaveType
                      }
                    </p>

                  </div>

                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    leave.status ===
                    "Approved"
                      ? "bg-green-100 text-green-700"
                      : leave.status ===
                        "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {leave.status}
                </span>

              </div>
            )
          )

        ) : (

          <div className="h-[260px] flex items-center justify-center text-gray-400">
            No applications today
          </div>

        )}

      </div>

    </div>
  );
};

export default UpcomingLeaves;