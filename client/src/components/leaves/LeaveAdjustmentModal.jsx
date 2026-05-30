const LeaveAdjustmentModal = ({
  breakdown,
  onConfirm,
  onClose,
}) => {

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-6 w-[450px]">

        <h2 className="text-2xl font-semibold text-black mb-3">

          Leave Adjustment

        </h2>

        <p className="text-sm text-gray-500 mb-6">

          Your leave request will be adjusted automatically.

        </p>

        <div className="space-y-3">

          {Object.entries(
            breakdown
          )
            .filter(
              ([, value]) =>
                value > 0
            )
            .map(
              (
                [key, value]
              ) => (

                <div
                  key={key}
                  className="flex justify-between bg-gray-50 rounded-2xl px-4 py-3"
                >

                  <span className="capitalize text-gray-700">

                    {key}

                  </span>

                  <span className="font-semibold text-black">

                    {value} day(s)

                  </span>

                </div>
              )
            )}

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-gray-300"
          >

            Cancel

          </button>

          <button
            onClick={onConfirm}
            className="bg-black text-white px-5 py-2 rounded-xl"
          >

            Continue

          </button>

        </div>

      </div>
    </div>
  );
};

export default LeaveAdjustmentModal;