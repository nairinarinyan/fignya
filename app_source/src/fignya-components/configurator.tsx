import { ComponentType, FC } from 'react';

type Props = {
  component: ComponentType;
};

export const Configurator: FC<Props> = props => {
  return (
    <div className="border-t h-1/3 w-full">
      <h1 className="text-lg mx-4 mt-2 mb-4 font-semibold">Props</h1>
    </div>
  );
};
