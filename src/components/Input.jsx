import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label htmlFor={id} className="text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        className={`px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
