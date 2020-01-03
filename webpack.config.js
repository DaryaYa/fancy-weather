const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                // style-loader
                { loader: 'style-loader' },
                // css-loader
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                },
                // sass-loader
                { loader: 'sass-loader' }
            ]
        }]
    }
};