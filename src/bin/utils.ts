import { dirname, join, parse } from 'path';
import { access } from 'fs-extra';

const checkDir = async (paths: string[], idx = 0): Promise<string | null> => {
  const path = paths[idx];

  if (!path) {
    return null;
  }

  try {
    await access(path);
    return path;
  } catch (err) {
    return checkDir(paths, idx + 1);
  }
}

const traversePaths = (dir: string, root: string, paths: string[] = []): string[] => {
  const dirName = dirname(dir);

  if (dirName === root) {
    return paths.concat(dirName);
  }

  return traversePaths(dirName, root, paths.concat(dirName));
};

export const findRoot = (fileName: string) => {
  const dir = process.cwd();
  const { root } = parse(dir);

  const paths = traversePaths(dir, root, [dir]).map(p => {
    return join(p, fileName);
  });

  return checkDir(paths);
};