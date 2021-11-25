#!/usr/bin/env node

import { dirname, join } from 'path';

import { init } from './init';
import { build } from './build';
import { run } from './run';
import { component } from './component';
import { readFile } from 'fs-extra';
import { findRoot } from './utils';
import { Command, Config, UserConfig } from './types';

const cliCommands: { [key: string]: Command } = {
  init: Command.INIT,
  build: Command.BUILD,
  run: Command.RUN,
  component: Command.COMPONENT,
};

const commands: { [key in Command]: (args: string[], config: Config) => void } = {
  [Command.INIT]: init,
  [Command.BUILD]: build,
  [Command.RUN]: run,
  [Command.COMPONENT]: component,
};

const start = async () => {
  const dir = process.cwd();
  const [,,commandArg, ...args] = process.argv;
  const command = cliCommands[commandArg];

  if (!command) {
    console.warn(`${commandArg} is not a known command`);
    return process.exit(1);
  }

  const config: Config = {
    name: '',
    componentsRoot: '',
    viewsRoot: '',
    projectRoot: process.cwd(),
  };

  if (command === Command.INIT) {
    return init(args, config);
  }

  const configPath = await findRoot('fignya.config.json')

  if (!configPath) {
    console.error('fignya.config.json not found');
    return process.exit(1);
  }

  config.projectRoot = dirname(configPath);

  try {
    const userConfig = JSON.parse(await readFile(configPath, { encoding: 'utf-8' })) as UserConfig;
    // userConfig.componentsRoot = join(config.projectRoot, userConfig.componentsRoot);
    // userConfig.viewsRoot = join(config.projectRoot, userConfig.viewsRoot);

    Object.assign(config, userConfig);
  } catch (err) {
    console.warn('User config not found');
  }

  commands[command](args, config);
};

start();

