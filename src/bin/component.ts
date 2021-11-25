import { stat, mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { Config } from './types';

// const componentDir = './src/app_root/src/components/';

const compSrc = (name: string, rawName: string) => `
import { FC } from 'react';

import './${rawName}.css';

type Props = {
};

export const ${name}: FC<Props> = props => {
  return (
    <div className="${rawName}">
      ${name}
    </div>
  );
};
`;

export const component = async (args: string[], config: Config) => {
  const [rawName] = args;

  if (!rawName) {
    return console.warn('Name is required');
  }

  const compDir = join(config.projectRoot, config.componentsRoot, rawName);
  const compPath = join(compDir, rawName + '.tsx');
  const stylePath = join(compDir, rawName + '.css');

  try {
    await stat(compDir);
    return console.warn(`${rawName} component exists`);
  } catch (err) {
    console.log('create component', rawName);

    await mkdir(compDir);

    const name = rawName
      .split('-')
      .map(part => part[0].toUpperCase() + part.slice(1))
      .join('');

    await writeFile(compPath, compSrc(name, rawName).trimStart());
    await writeFile(stylePath, '');
  }
};