import React, { forwardRef, useId } from "react";

const Select = forwardRef(
  ({ options, label, className = "", ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <select
          id={id}
          ref={ref}
          className={`border border-gray-300 rounded-lg p-2 w-full ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
