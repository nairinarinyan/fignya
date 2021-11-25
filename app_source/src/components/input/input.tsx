import { FC } from 'react';

type Props = {
};

export const Input: FC<Props> = props => {
  return (
    <label htmlFor="input" className="flex flex-col">
      <span className="mb-2 text-gray-700">Label</span>
      <input id="input" type="text" placeholder="Input" className="ring-2 px-4 py-2 rounded-md" />
    </label>
  );
};
