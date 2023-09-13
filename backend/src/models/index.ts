import { Sequelize } from 'sequelize';
import config from '../config/databaseConfig';
import { Config } from '../types/configTypes';
import fs from 'fs';
import path from 'path';

const env: keyof Config = (process.env.NODE_ENV as keyof Config) || 'development';
const { database, username, password } = config[env];

const sequelize = new Sequelize(database, username, password || undefined, {
  dialect: 'mysql',
  timezone: 'America/Sao_Paulo'
});

(async () => {
  const files = fs.readdirSync(__dirname).filter(file => {
      return file.indexOf('.') !== 0 && file !== 'index.ts' && file.slice(-3) === '.ts';
  });

  const models: any = {};

  for (const file of files) {
      const model = await import(path.join(__dirname, file));
      const initFunctionName = 'init' + file.charAt(0).toUpperCase() + file.slice(1, -3);
      if (model[initFunctionName]) {
          models[file.slice(0, -3)] = model[initFunctionName](sequelize);
      } else {
          console.warn(`Initialization function ${initFunctionName} not found in model ${file}`);
      }
  }

  for (const file of files) {
      const model = await import(path.join(__dirname, file));
      if (model.associate) {
          model.associate(models);
      }
  }
})();

export { sequelize };
