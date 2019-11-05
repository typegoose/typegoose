import * as fs from 'fs';

interface IConfig {
  Memory: boolean;
  DataBase: string;
  Port: number;
  Auth: IAuth;
  IP: string;
}

interface IAuth {
  User: string;
  Passwd: string;
  DB: string;
}

enum EConfig {
  MONGODB_IP = 'MongoDB IP is not specified!',
  MONGODB_DB = 'MongoDB DataBase is not specified!',
  MONGODB_PORT = 'MongoDB Port is not specified!',
  MONGODB_AUTH = 'You should activate & use MongoDB Authentication!'
}

const env: NodeJS.ProcessEnv = process.env; // just to write less

let path: string = env.CONFIG ?? './test/config.json';
path = fs.existsSync(path) ? path : './test/config_default.json';

const configRAW: Readonly<IConfig> =
  JSON.parse(fs.readFileSync(path).toString());

// ENV || CONFIG-FILE || DEFAULT
const configFINAL: Readonly<IConfig> = {
  Memory: env.C_USE_IN_MEMORY !== undefined ||
    (typeof configRAW.Memory === 'boolean' ? configRAW.Memory : true),
  DataBase: env.C_DATABASE ?? configRAW?.DataBase ?? 'typegooseTest',
  Port: parseInt(env.C_PORT as string, 10) || configRAW.Port || 27017,
  Auth: {
    User: env.C_AUTH_USER ?? configRAW?.Auth?.User ?? '',
    Passwd: env.C_AUTH_PASSWD || configRAW?.Auth?.Passwd || '',
    DB: env.C_AUTH_DB || configRAW?.Auth?.DB || ''
  },
  IP: env.C_IP ?? configRAW.IP ?? 'localhost'
};

/** Small callback for the tests below */
function cb(text: string): void {
  // tslint:disable-next-line:no-console
  console.error(text);
  process.exit(-1);
}

if (!configFINAL.Memory) {
  if (!configFINAL.IP) { cb(EConfig.MONGODB_IP); }
  if (!configFINAL.DataBase) { cb(EConfig.MONGODB_DB); }
  if (!configFINAL.Port) { cb(EConfig.MONGODB_PORT); }
}

export { configFINAL as config };
