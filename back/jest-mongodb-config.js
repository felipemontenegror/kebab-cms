module.exports = {
    mondodbMemoryServerOptions: {
        instance: {
            dbName: 'jest'
        },
        binary: {
            version: '4.0.2', //Version of MongoDB
            skipMD5: true
        },
        autoStart: false
    }
};