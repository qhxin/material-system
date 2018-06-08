export default {
  "entry": "src/index.js",
  "extraBabelPlugins": [
    ['transform-decorators-legacy'],
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }],
  ],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime"
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime"
      ]
    }
  }
}
