import { FC } from 'react';
import { ComponentMap } from '../../types/types';

// import './browser.css';

type Props = {
  components: ComponentMap,
  onSelect: (shortName: string) => void;
  selectedComp: string;
};

export const Browser: FC<Props> = ({ components, selectedComp, onSelect }) => {
  return (
    <div className="">
      <div className="py-12 px-4">
        <h1 className="text-xl">Components</h1>
      </div>
      <div className="p-2 border-t">
        {Object.keys(components).map(name => {
          const isSelected = name === selectedComp;

          return (
            <div
              key={name}
              className={`py-2 px-4 mb-2 rounded-md hover:bg-blue-50 cursor-pointer ${isSelected && 'bg-blue-50'}`}
              onClick={() => onSelect(name)}
            >
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
