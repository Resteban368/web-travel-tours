// PM2 ecosystem config — deploy en servidor Linux propio
module.exports = {
  apps: [
    {
      name: 'travel-tours',
      script: 'node_modules/.bin/next',
      args: 'start',
      instances: 'max',        // un proceso por core
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
