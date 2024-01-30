module.exports = {
    apps: [
      {
        name: 'authappmoment',
        script: './dist/app.js', // Adjust this path based on your output directory
        watch: true,
        ignore_watch: ['node_modules', 'logs'],
        instances: 1,
        exec_mode: 'cluster',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  