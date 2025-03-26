import app from './app';
import config from '../src/app/index';
import mongoose from 'mongoose';
import { Server } from 'http';
import seedSuperAdmin from './app/DB';
import logger from './app/utils/logger';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    await seedSuperAdmin();

    server = app.listen(config.port, () => {
      logger.info(`This server is running on Port ${config.port}`);
    });
  } catch (error) {
    logger.error(error);
  }
}

main();

process.on('unhandledRejection', () => {
  logger.error(`😡 unhandledRejection is detected, shutting down!...`);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});