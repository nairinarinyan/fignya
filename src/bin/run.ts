import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { Config } from './types';

const startMarker = '\/\/ __COMPONENT_INCLUDES_START__';
const endMarker = '\/\/ __COMPONENT_INCLUDES_END__';

const regex = new RegExp(`${startMarker}[\\s\\S]*${endMarker}`, 'gm');

// const componentDir = './src/app_root/src/components/';
// const mainFilePath = './src/app_root/src/main.tsx';
// const entryFilePath = './src/app_root/index.ts';

const generateImport = (path: string, compName: string) => {
  return `import { ${compName} } from '${path}';`;
};

const generateExport = (path: string, compName: string) => {
  return `export { ${compName} } from '${path}';`;
};


export const run = async (args: string[], config: Config) => {
  const comps = await readdir(config.componentRoot)

  const compData = comps.map(comp => {
    const rawName = comp;
    const path = './' + join('./components/', comp, comp); 
    const pathForEntry = './' + join('./src/components/', comp, comp);

    const name = comp
      .split('-')
      .map(part => part[0].toUpperCase() + part.slice(1))
      .join('');
    
    // const importSt = generateImport(path, name);
    const exportSt = generateExport(pathForEntry, name);

    return { rawName, name, path, exportSt };
  });

  // const imports = compData.map(d => d.importSt).join('\n');
  const exports = compData.map(d => d.exportSt).join('\n');
  // const keyValues = compData.map(d => `'${d.rawName}': ${d.name}`).join(', ')
  // const compMap = `const components = { ${keyValues} }`;

  // const include = `${imports}\n\n${compMap}`;


// const mainFilePath = './src/app_root/src/main.tsx';
  // const mainFilePath = join(config.projectRoot, 'src/main.tsx')
  const entryFilePath = join(config.projectRoot, 'index.ts')

  // const mainFileSrc = await readFile(mainFilePath, { encoding: 'utf-8' });
  // const newMainSrc = mainFileSrc.replace(regex, include);

  // writeFile(mainFilePath, newMainSrc);
  writeFile(entryFilePath, exports);

  // console.log(regex);
  // console.log(mainFileSrc.match(regex));
  // console.log(newMainSrc)
};