import React, { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, error, ...inputProps }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-1">
        {label}
      </label>
      <input
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...inputProps}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
