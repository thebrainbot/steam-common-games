/**
 * @see https://github.com/Codigami/hapi-starter-kit
 */

import * as server from './src/server';

const gracefulStopServer = async function gracefulStopServer(): Promise<void> {
  // Wait 10 secs for existing connection to close and then exit.
  console.log('Shutting down server...');
  await server.instance.stop({ timeout: 10 * 1000 });
  console.log('Server stopped');
  process.exit();
};

process.on('uncaughtException', err => {
  console.error('error', err, 'Uncaught exception');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    'error',
    {
      promise,
      reason,
    },
    'unhandledRejection',
  );
  process.exit(1);
});

process.on('SIGINT', gracefulStopServer);
process.on('SIGTERM', gracefulStopServer);

server.start();
