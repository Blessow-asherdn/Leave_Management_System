import React from "react";

const StatCard = ({
  title,
  value,
  icon,
  color,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-gray-500 font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-black mt-3">
            {value}
          </h2>
        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
};

export default StatCard;