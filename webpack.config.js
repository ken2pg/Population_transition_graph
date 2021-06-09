const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        open: true,
        historyApiFallback: true,
    },
    plugins: [new Dotenv()],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
            },
            {
                test: /\.(png|jpg)$/i,
                loader: 'url-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};
