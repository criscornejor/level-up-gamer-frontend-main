module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],
    files: [
      {
        pattern: 'level-up-gamer-frontend-main/src/**/*.spec.js',
        watched: false,
      },
    ],
    preprocessors: {
      'level-up-gamer-frontend-main/src/**/*.spec.js': ['webpack'],
    },
    webpack: {
      mode: 'development',
    },
    reporters: ['progress'],
    browsers: ['jsdom'],
    singleRun: true,
    restartOnFileChange: false,
  });
};
