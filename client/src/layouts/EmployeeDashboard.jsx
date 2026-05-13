import DashboardLayout from "../layouts/DashboardLayout";

const EmployeeDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Employee Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">
            Remaining Leaves
          </h2>

          <p className="text-3xl mt-4 font-bold">
            0
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">
            Used Leaves
          </h2>

          <p className="text-3xl mt-4 font-bold">
            0
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">
            Pending Requests
          </h2>

          <p className="text-3xl mt-4 font-bold">
            0
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
