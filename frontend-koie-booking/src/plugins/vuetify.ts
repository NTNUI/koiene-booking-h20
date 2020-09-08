import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { preset } from 'vue-cli-plugin-vuetify-preset-crane/preset';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import scssVars from '@/styles/variables.scss';

Vue.use(Vuetify);

const options = {
  breakpoint: {
    thresholds: {
      sm: 600
    }
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: scssVars.globalColorPrimary,
        secondary: scssVars.globalColorSecondary,
        accent: scssVars.globalColorAccent,
        background: scssVars.globalColorBackground,
        backgroundLight: scssVars.globalColorBackgroundLight,
        anchor: scssVars.globalColorAnchor
      },
      light: {
        accent: scssVars.globalColorBlack
      }
    }
  }
};

declare module 'vue/types/vue' {
  interface Vue {
    $scssVars: any; // define real typings here if you want
    $apiUrl: string;
  }
}

export default new Vuetify({ preset, ...options });
