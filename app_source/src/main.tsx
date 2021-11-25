import React, { FC, useState } from 'react';
import { render } from 'react-dom';
import 'tailwindcss/tailwind.css';
import { navigate, useLocation } from './router/router';
import * as components from '../index';

import { Browser } from './fignya-components/browser/browser';

import './styles.css';

const App: FC = () => {
  const [selectedComp, setSelectedComp] = useState<string>();

  useLocation((path) => {
    setSelectedComp(path.replace(/^\//, ''));
  });

  return (
    <main className="h-full flex">
      <aside className="w-1/5">
        <Browser
          components={components}
          selectedComp={selectedComp}
          onSelect={navigate}
        />
      </aside>
      <section className="border-l flex-1 flex justify-center items-center">
        {components[selectedComp] &&
          components[selectedComp]({ value: 'something' })
        }
      </section>
    </main>
  );
};

render(
  <App />,
  document.getElementById('root')
);