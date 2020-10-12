module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // prependData isn't applied for some reason.. []make vue.config issue
        prependData: `@import "@/styles/variables.scss"; @import "@/styles/overrides.scss";`,
      },
    },
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  // publicPath is important so production build links asset-files using relative path
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  transpileDependencies: ['vuetify'],
};
