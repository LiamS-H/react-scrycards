import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
    { ignores: ["dist/**/*"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,css}"],
        ...pluginReact.configs.flat.recommended,
        languageOptions: {
            ...pluginReact.configs.flat.recommended.languageOptions,
            globals: {
                ...globals.serviceworker,
                ...globals.browser,
            },
            parserOptions: {
                warnOnUnsupportedTypeScriptVersion: false,
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "no-console": ["error", { allow: ["warn", "error"] }],
        },
    },
];
