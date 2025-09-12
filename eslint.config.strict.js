import baseConfig from "./eslint.config.js";

export default baseConfig.map((config) => ({
    ...config,
    rules: {
        ...config.rules,
        "no-console": "error", // Error blocks pushes
    },
}));
