module.exports = {
    apps: [
      {
        name: "your-app-name",
        script: "./dist/app.js", // Path to your compiled JavaScript entry file
        watch: true,
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  