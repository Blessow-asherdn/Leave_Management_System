import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";

const LeaveTrend = ({
  leaves = [],
}) => {

  const currentMonth =
    new Date().getMonth();

  const currentYear =
    new Date().getFullYear();

  const weeklyData = [
    {
      week: "Week 1",
      approved: 0,
      rejected: 0,
    },

    {
      week: "Week 2",
      approved: 0,
      rejected: 0,
    },

    {
      week: "Week 3",
      approved: 0,
      rejected: 0,
    },

    {
      week: "Week 4",
      approved: 0,
      rejected: 0,
    },
  ];

  leaves.forEach((leave) => {

    const leaveDate =
      new Date(
        leave.createdAt
      );

    if (
      leaveDate.getMonth() !==
        currentMonth ||
      leaveDate.getFullYear() !==
        currentYear
    ) {
      return;
    }

    const day =
      leaveDate.getDate();

    let weekIndex = 0;

    if (day <= 7)
      weekIndex = 0;

    else if (day <= 14)
      weekIndex = 1;

    else if (day <= 21)
      weekIndex = 2;

    else
      weekIndex = 3;

    if (
      leave.status ===
      "Approved"
    ) {

      weeklyData[
        weekIndex
      ].approved += 1;
    }

    if (
      leave.status ===
      "Rejected"
    ) {

      weeklyData[
        weekIndex
      ].rejected += 1;
    }
  });

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-black">
          Leave Trend
        </h2>

        <p className="text-sm text-gray-500">
          Weekly leave analytics
        </p>

      </div>

      <div className="h-[280px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={weeklyData}
          >

            <XAxis
              dataKey="week"
            />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="approved"
              fill="#22c55e"
              radius={[
                8,
                8,
                0,
                0,
              ]}
            />

            <Bar
              dataKey="rejected"
              fill="#ef4444"
              radius={[
                8,
                8,
                0,
                0,
              ]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default LeaveTrend;