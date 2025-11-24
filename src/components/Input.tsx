import React from 'react';
import warningIcon from '../assets/icons/warningIcon.svg';

interface InputProps {
  type?: 'text' | 'email' | 'password';
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
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
  onBlur,
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
        onBlur={onBlur}
        className={`w-full py-2.5 border rounded-md text-sm focus:outline-none focus:ring-1 ${
          error
            ? 'border-error focus:ring-error focus:border-error pl-4 pr-11'
            : 'border-gray-300 focus:ring-gray-400 focus:border-gray-400 px-4'
        }`}
        placeholder={placeholder}
      />
      {error && (
        <>
          <img 
            src={warningIcon} 
            alt="Warning" 
            className="absolute right-3 top-3 w-5 h-5 pointer-events-none" 
          />
          <p className="mt-1 text-xs text-error">{error}</p>
        </>
      )}
    </div>
  );
};

export default Input;
