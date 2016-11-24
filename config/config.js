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
    }
};

module.exports = function (mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
};