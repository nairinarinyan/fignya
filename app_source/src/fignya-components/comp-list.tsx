import { FC } from 'react';
import { ComponentMap } from '../types/types';

type Props = {
  name: string;
  components: ComponentMap,
  onSelect: (shortName: string) => void;
  selectedComp: string;
};

export const CompList: FC<Props> = ({ name, components, selectedComp, onSelect }) => {
  return (
    <div className="p-2 border-t">
      <h1 className="text-lg mx-4 mt-2 mb-4 font-semibold">{name}</h1>
      {Object.keys(components).map(name => {
        const isSelected = name === selectedComp;

        return (
          <div
            key={name}
            className={`py-2 px-4 mb-2 rounded-md text-sm hover:bg-blue-50 cursor-pointer ${isSelected && 'bg-blue-50'}`}
            onClick={() => onSelect(name)}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};
