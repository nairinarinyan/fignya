import { Config } from './types';
import { findRoot } from './utils';


export const build = async (args: string[], config: Config) => {
  console.log('building comp library...', await findRoot('fignya.config.json'));
};