export type UserConfig = {
  name: string;
  componentRoot: string;
};

export type Config = UserConfig & {
  projectRoot: string;
};

export enum Command {
  INIT = 'INIT',
  BUILD = 'BUILD',
  RUN = 'RUN',
  COMPONENT = 'COMPONENT',
}
