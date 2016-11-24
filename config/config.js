var config = {
    local: {
        mode: 'local',
        port: 10000,
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/paca-sso'
    },
    staging: {
        mode: 'staging',
        port: '10000',
        mongoUrl: process.env.MONGODB_URI
    },
    prd: {
        mode: 'prd',
        port: process.env.PORT || 10000,
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/paca-sso'
    },
    test: {
        mode: 'test',
        port: 10001,
        mongoUrl: 'mongodb://localhost:27017/paca-sso-test'
    }
};

module.exports = function (mode) {
    console.log(mode, process.argv[2], process.env.PACA_MODE);
    return config[mode || process.argv[2] || process.env.PACA_MODE || 'local'] || config.local;
};