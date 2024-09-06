import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { 
    globals: {
      ...globals.browser,
      process: "readonly",
      MY_ENV_VAR: "readonly"
    }
   },
  },
  pluginJs.configs.recommended,
];