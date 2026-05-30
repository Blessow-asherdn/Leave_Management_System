import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

const LeaveOverview = ({
  leaves = [],
}) => {

  const approved =
    leaves.filter(
      (leave) =>
        leave.status ===
        "Approved"
    ).length;

  const pending =
    leaves.filter(
      (leave) =>
        leave.status ===
        "Pending"
    ).length;

  const rejected =
    leaves.filter(
      (leave) =>
        leave.status ===
        "Rejected"
    ).length;

  const data = [
    {
      name: "Approved",
      value: approved,
    },

    {
      name: "Pending",
      value: pending,
    },

    {
      name: "Rejected",
      value: rejected,
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm h-full">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-lg font-semibold text-black">
            Leave Request Overview
          </h2>

          <p className="text-sm text-gray-500">
            Current leave status
          </p>

        </div>

      </div>

      <div className="h-[260px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              innerRadius={70}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
            >

              {data.map(
                (
                  entry,
                  index
                ) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index
                      ]
                    }
                  />
                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="space-y-3 mt-2">

        {data.map(
          (
            item,
            index
          ) => (
            <div
              key={index}
              className="flex items-center justify-between"
            >

              <div className="flex items-center gap-3">

                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background:
                      COLORS[
                        index
                      ],
                  }}
                />

                <span className="text-sm text-gray-700">
                  {item.name}
                </span>

              </div>

              <span className="text-sm font-semibold text-black">
                {item.value}
              </span>

            </div>
          )
        )}

      </div>

    </div>
  );
};

export default LeaveOverview;