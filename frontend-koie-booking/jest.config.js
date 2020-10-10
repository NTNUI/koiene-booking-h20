module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: [],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/admin/**',
    'src/components/report/**',
    'src/views/Admin.vue',
    'src/views/Report.vue',
  ],
};
