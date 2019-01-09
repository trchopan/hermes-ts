import "vuetify/src/stylus/app.styl";
import colors from "vuetify/es5/util/colors";
import { Ripple } from "vuetify/es5/directives";

export default {
  directives: { Ripple },
  theme: {
    secondary: colors.pink.accent2,
    accent: colors.indigo.base,
    warn: colors.red.accent2
  }
};
