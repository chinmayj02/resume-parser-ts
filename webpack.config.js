const path = require('path');
const util = require('util');


module.exports = {
    entry: './resume-parser.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.tsx','.ts', '.js']
    },
    module: {
        resolve: {
            fallback: {
              util: require.resolve('util/'),
              path: require.resolve('path-browserify'),
            },
          },
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsx$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    mode: 'development'
};
