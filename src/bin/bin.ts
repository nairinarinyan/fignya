#!/usr/bin/env node

import { init } from './init';
import { build } from './build';
import { run } from './run';
import { component } from './component';

enum Command {
  INIT,
  BUILD,
  RUN,
  COMPONENT
}

const cliCommands: { [key: string]: Command } = {
  init: Command.INIT,
  build: Command.BUILD,
  run: Command.RUN,
  component: Command.COMPONENT,
};

const commands: { [key in Command]: (args: string[]) => void } = {
  [Command.INIT]: init,
  [Command.BUILD]: build,
  [Command.RUN]: run,
  [Command.COMPONENT]: component,
};

const processCommand = () => {
  const [,,commandArg, ...args] = process.argv;
  const command = cliCommands[commandArg];

  if (!command) {
    return console.warn(`${commandArg} is not a known command`);
  }

  commands[command](args);
};

processCommand();
