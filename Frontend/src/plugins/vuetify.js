import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: "#0D1B2A",
        primaryLight: "#1B263B",
        secondary: "#778DA9",
        secondaryLight: "#E0E1DD",
        accent: "#2962FF",
        error: "#b71c1c",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
      light: {
        primary: "#2f3437",
        secondary: "#373c3f",
        secondaryLight: "#3f4447",
        accent: "#1c0436",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
});
