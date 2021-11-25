import { FC } from 'react';
import { ComponentMap } from '../types/types';
import { CompList } from './comp-list';

// import './browser.css';

type Props = {
  components: ComponentMap,
  views: ComponentMap,
  onSelect: (shortName: string) => void;
  selectedComp: string;
};

export const Browser: FC<Props> = ({ components, views, selectedComp, onSelect }) => {
  return (
    <div className="pt-12">
      <CompList
        name="Components"
        components={components}
        onSelect={onSelect}
        selectedComp={selectedComp}
      />
      <CompList
        name="Views"
        components={views}
        onSelect={onSelect}
        selectedComp={selectedComp}
      />
    </div>
  );
};
