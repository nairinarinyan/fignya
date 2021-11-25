import { FC } from 'react';

type Props = {
  label?: string;
  placeholder?: string;
};

export const Input: FC<Props> = ({ label, placeholder }) => {
  return (
    <label htmlFor="input" className="flex flex-col">
      {label &&
        <span className="mb-2 text-gray-700">{label}</span>
      }
      <input id="input" type="text" placeholder={placeholder} className="ring-2 px-4 py-2 rounded-md" />
    </label>
  );
};

Input.defaultProps = {
  label: 'SomeLabel',
  placeholder: 'Placeholder'
};