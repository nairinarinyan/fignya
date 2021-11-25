import { FC } from 'react';

import './button.css';

type Props = {
  text: string;
  fluid: boolean;
};

export const Button: FC<Props> = ({ fluid, text }) => {
  return (
    <button className={`text-white bg-pink-600 rounded-md px-6 py-2 ${fluid && 'w-full'}`}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: 'Press me'
};