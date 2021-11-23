import { Component, FC, lazy, LazyExoticComponent, Suspense, useState } from 'react';
import { render } from 'react-dom';
import componentData  from '../components.json';
import { navigate, useLocation } from './router/router';

import { Button } from './components/button/button';
import { Input } from './components/input/input';
import { Yoyo } from './components/yoyo/yoyo';

const components = { 'button': Button, 'input': Input, 'yoyo': Yoyo }

// import Input from  './components/input/input';
// import Button from './components/button/button';

// const components = {
//   input: Input,
//   button: Button,
// };

type ComponentData = {
  name: string;
  path: string;
};

const App: FC = () => {
  const [compName, setCompName] = useState<string>();

  useLocation((path, comp) => {
    setCompName(path.replace(/^\//, ''));
  });

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <aside>
        <h1>Components</h1>
        {Object.keys(components).map(rawName => {
          return (
            <button key={rawName} onClick={() => navigateTo(rawName)}>
              {rawName}
            </button>
          );
        })}
      </aside>
      <main className="border">
        {components[compName] &&
          components[compName]({ value: 'something' })
        }
      </main>
    </div>
  );
};

render(
  <App />,
  document.getElementById('root')
);