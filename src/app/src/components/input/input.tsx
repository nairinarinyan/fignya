import { FC } from 'react';

import './input.css';

type Props = {
  value: string
};

export const Input: FC<Props> = ({ value }) => {
  return (
    <div className="mld-input">
      <input type="text" value={value} />
    </div>
  );
};