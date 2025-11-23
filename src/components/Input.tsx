import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password';
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  className = '',
}) => {
  return (
    <div className={`flex-1 relative ${className}`}>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-1 ${
          error
            ? 'border-error focus:ring-error focus:border-error'
            : 'border-gray-300 focus:ring-gray-400 focus:border-gray-400'
        }`}
        placeholder={placeholder}
      />
      {error && (
        <>
          <svg 
            className="absolute right-3 top-3 w-5 h-5 text-error pointer-events-none" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
              clipRule="evenodd" 
            />
          </svg>
          <p className="mt-1 text-xs text-error">{error}</p>
        </>
      )}
    </div>
  );
};

export default Input;
