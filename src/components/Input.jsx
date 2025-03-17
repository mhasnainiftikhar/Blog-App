import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, type = 'text', className = '', error, ...props }, ref) => {
  const inputId = props.id || `input-${label?.replace(/\s+/g, '').toLowerCase()}`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        type={type}
        className={`px-3 py-2 w-full rounded-lg bg-white border shadow-sm outline-none placeholder-gray-400 transition-all duration-300
          ${error ? 'border-red-500 focus:ring-red-300 animate-shake' : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'} 
          ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
});

// Shake animation for error
const styles = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-3px); }
}
.animate-shake {
  animation: shake 0.3s ease-in-out;
}
`;

export default function StyledInput(props) {
  return (
    <>
      <style>{styles}</style>
      <Input {...props} />
    </>
  );
}
