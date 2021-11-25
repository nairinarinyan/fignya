import React, { ComponentType, FC, useMemo, useState } from 'react';
import { render } from 'react-dom';
import 'tailwindcss/tailwind.css';
import { navigate, useLocation } from './router/router';

import * as components from '../components';
import * as views from '../views';

import { Browser } from './fignya-components/browser';

import './styles.css';
import { Configurator } from './fignya-components/configurator';

const App: FC = () => {
  const [selectedCompName, setSelectedComp] = useState<string>();

  useLocation((path) => {
    setSelectedComp(path.replace(/^\//, ''));
  });

  const SelectedComp = useMemo((): ComponentType => {
    return components[selectedCompName] || views[selectedCompName];
  }, [selectedCompName]);

  return (
    <main className="h-full flex">
      <aside className="w-1/5">
        <Browser
          components={components}
          views={views}
          selectedComp={selectedCompName}
          onSelect={navigate}
        />
      </aside>
      <section className="border-l flex-1 flex flex-col ">
        <div className="flex-1 flex justify-center items-center">
          {SelectedComp &&
            <SelectedComp {...SelectedComp.defaultProps} />
          }
        </div>
        <Configurator
          component={SelectedComp}
        />
      </section>
    </main>
  );
};

render(
  <App />,
  document.getElementById('root')
);