import { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

const TextField = ({ onChange, placeholder }: TextFieldProps) => {
  return (
    <input
      type="text"
      className="py-3 px-4 block w-full border-gray-200 bg-neutral-100 rounded-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 outline-none text-base"
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextField;
