import { readdir, readFile, writeFile } from 'fs/promises';

const startMarker = '\/\/ __COMPONENT_INCLUDES_START__';
const endMarker = '\/\/ __COMPONENT_INCLUDES_END__';

const regex = new RegExp(`${startMarker}[\\s\\S]*${endMarker}`, 'gm');
// const regex = new RegExp(`COMPONENT[\\s\\S]+`, 'gm');

const componentDir = './src/app/src/components/';
const mainFilePath = './src/app/src/main.tsx';

const generateImport = (path: string, compName: string) => {
  return `import { ${compName} } from '${path}';`;
};

// const components = {
//   input: Input,
//   button: Button,
// };

export const run = async (args: string[]) => {
  const comps = await readdir(componentDir)

  const compData = comps.map(comp => {
    const rawName = comp;
    const path = './components/' + comp + '/' + comp; 

    const name = comp
      .split('-')
      .map(part => part[0].toUpperCase() + part.slice(1))
      .join('');
    
    const statement = generateImport(path, name);

    return { rawName, name, path, statement };
  });

  const imports = compData.map(d => d.statement).join('\n');
  const keyValues = compData.map(d => `'${d.rawName}': ${d.name}`).join(', ')
  const compMap = `const components = { ${keyValues} }`;

  const include = `${imports}\n\n${compMap}`;

  const mainFileSrc = await readFile(mainFilePath, { encoding: 'utf-8' });
  const newSrc = mainFileSrc.replace(regex, include);
  writeFile(mainFilePath.replace('main', 'done'), newSrc);

  // console.log(regex);
  // console.log(mainFileSrc.match(regex));
  console.log(newSrc)
};