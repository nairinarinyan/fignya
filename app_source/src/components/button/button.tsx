import { FC } from 'react';

import './button.css';

type Props = {
};

export const Button: FC<Props> = props => {
  return (
    <button className="text-white bg-pink-600 rounded-md px-6 py-2">
      Press me
    </button>
  );
};
