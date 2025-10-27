import React from "react";

const InputPayment = ({ Icon, name, value, register, setShowCard }) => {
  return (
    <div className="md:px-3 px-1 py-4 card border border-gray-200 bg-white rounded-md">
      <label className="cursor-pointer label">
        <div className="flex item-center justify-between">
          <div className="flex items-center">
            <span className="text-xl md:mr-3 mr-1 text-gray-400">
              <Icon />
            </span>
            <h6 className="font-medium text-sm text-gray-600">{value}</h6>
          </div>
          <input
            onClick={() => setShowCard(value === "Card" ? true : false)}
            {...register("paymentMethod", {
              required: "Payment Method is required!",
            })}
            type="radio"
            value={value}
            name="paymentMethod"
            className="form-radio outline-none focus:ring-0 text-emerald-500"
          />
        </div>
      </label>
    </div>
  );
};

export default InputPayment;
