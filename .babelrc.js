const plugins = [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ["./src/"],
        alias: {
          "~": "./",
          "@api": "./api",
          "@assets": "./assets",
          "@redux": "./redux",
          "@components": "./common/components",
          "@common": "./common",
          "@utils": "./utils",
        }
      }
    ]
  ];