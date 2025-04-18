module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel'
    ],

    plugins: [["module-resolver", {
      root: ["./"],

      alias: {
        "@": "./",
        "@components": "./components",
        "@contexts": "./contexts",
        "@services": "./services",
        "@stores": "./stores",
        "@utils": "./utils",
        "@hooks": "./hooks",
        "@assets": "./assets",
        "tailwind.config": "./tailwind.config.js"
      }
    }]]
  };
};