import { join } from 'path';
import { copy, readFile, writeFile, rename } from 'fs-extra';
import { Config } from './types';

const filesToReplaceIn = [
  'package.json',
  'index.html',
  'fignya.config.json'
];

const replaceNameInFiles = async (appName: string, appDir: string) => {
  const replacePromises = filesToReplaceIn.map(async fileName => {
    const filePath = join(appDir, fileName);
    const fileContent = await readFile(filePath, 'utf-8');
    const replacedContent = fileContent.replace('app_name_', appName);
    return writeFile(filePath, replacedContent);
  });

  return Promise.all(replacePromises);
};
const renameGitignore = async (appDir: string) => {
  const sourcePath = join(appDir, '_.gitignore');
  const targetPath = join(appDir, '.gitignore');
  return rename(sourcePath, targetPath);
};

const copySource = async (appName: string, appDir: string) => {
  const sourceDir = join(__dirname, '../app_source');
  const foldersToExclude = ['node_modules', 'dist', 'public', '.parcel-cache', 'package-lock.json'];

  return copy(sourceDir, appDir, {
    filter(src: string, dest: string) {
      return foldersToExclude.every(f => !src.includes(f));
    }
  });
};

export const init = async (args: string[], config: Config) => {
  const [appName] = args;

  const parentDir = process.cwd();
  const appDir = join(parentDir, appName);

  try {
    await copySource(appName, appDir);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  try {
    await replaceNameInFiles(appName, appDir);
    await renameGitignore(appDir);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};