import React from "react";

type Props = {
  type?: string;
  placeholder: string;
  name: string;
  value: any;
  setValue: any;
  disabled?: boolean;
};

const TextInput = ({
  type = "text",
  placeholder,
  value,
  setValue,
  name,
  disabled = false,
}: Props) => {
  return (
    <input
      type={type}
      disabled={disabled}
      name={name}
      value={value}
      onChange={setValue}
      className='col-span-1 border mb-2 rounded p-2 w-full'
      placeholder={placeholder}
    />
  );
};

export default TextInput;
