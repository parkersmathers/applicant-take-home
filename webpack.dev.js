const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');

const mockData = require('./mocks/prizeout.json');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        disableHostCheck: true,
        // host:'local',
        hot: true,
        port: 8169,
        before: function (app) {
            app.post('/api/prizeout', function (req, res) {
                res.status(201).json(mockData);
            });
        },
    },
});
