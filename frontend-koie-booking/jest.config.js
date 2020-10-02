module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: [],
  collectCoverage: true,
  collectCoverageFrom: ['src/components/admin/*'],
};
