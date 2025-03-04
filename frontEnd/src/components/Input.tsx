import React from "react";

const Input = ({
  icon: Icon,
  ...props
}: {
  icon: React.ElementType;
  type: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean
}) => {
  return (
    <div className="relative mb-6">
      {/* Icon Wrapper */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-green-800" />
      </div>

      {/* Input Field */}
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-50 rounded-lg 
        border-2 border-green-700  focus:border-blue-900 focus:ring-1 focus:ring-green-500
        text-black placeholder-gray-400 transition duration-200 outline-none"
      />
    </div>
  );
};

export default Input;

