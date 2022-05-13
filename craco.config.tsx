const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    reactScriptsVersion: "react-scripts" /* (default value) */,

  
plugins: [
        {
            plugin: {
                NodePolyfillPlugin :  new NodePolyfillPlugin()
            },
            options: {}
        }
    ]
};
export {}