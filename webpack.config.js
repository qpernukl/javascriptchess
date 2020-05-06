const path = require("path");

module.exports = {
    mode: 'development',
    entry: "./src/js/chess.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    }
};

module.exports = {
    entry: ["babel-polyfill", "./src/js/chess.js"],
    output: {
        path: path.resolve(__dirname, "public/js"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
};