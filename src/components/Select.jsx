import React, { useId, forwardRef } from 'react';
import PropTypes from 'prop-types';

const Select = forwardRef(({ options, label, className = '', ...props }, ref) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black border border-gray-300 w-full 
        outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition ${className}`}
      >
        {options?.map((option, index) => (
          <option key={`${option}-${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Select;
