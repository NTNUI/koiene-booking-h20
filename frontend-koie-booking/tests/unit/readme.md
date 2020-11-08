# Tests

In order to speed up the development of tests, utils functions for mounting components have been
made.

The util functions takes two arguments: The component under test (CUT) and additional mounting options.


The functions provide the base config for components:
* localVue
* vuetify
* store
* i18n

If you want to override these or add custom mounting options, you can provide these manually as the second argument.

**NB: It's important that you include `Vue.use(Vuetify)` at the top of your test file** 
