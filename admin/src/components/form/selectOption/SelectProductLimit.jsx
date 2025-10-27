import React from "react";

const SelectProductLimit = React.forwardRef(
  ({ register, name, label, required }, ref) => {
    return (
      <>
        <select
          name={name}
          {...register(`${name}`, {
            required: required ? `${label} is required!` : false,
          })}
          ref={ref}
          className="block w-full h-10 border border-emerald-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700"
        >
          <option value="" defaultValue hidden>
            Select Products Limit
          </option>
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="18">18</option>
        </select>
      </>
    );
  }
);
export default SelectProductLimit;