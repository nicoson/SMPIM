let config = {};
switch(process.env.ENV) {
    case 'PRD':
        config = {
            // MONGODB:        "mongodb://127.0.0.1:27017",
            // DATABASE:       "pim",
            // UPLOAD_PATH:    "./public/files",
            // FILESERVER:     `http://127.0.0.1:${process.env.PORT}/files`,
            MONGODB:        "mongodb://chanpinbu:chanpinbudemima@100.100.142.132:37017",
            DATABASE:       "pim",
            UPLOAD_PATH:    "./public/files",
            FILESERVER:     "http://100.100.141.137:3000/files",
        };
        break;
    case 'DEV':
        config = {
            MONGODB:        "mongodb://chanpinbu:chanpinbudemima@100.100.142.132:37017",
            DATABASE:       "pim",
            UPLOAD_PATH:    "./public/files",
            FILESERVER:     "http://100.100.141.137:3000/files",
        };
        break;
}

module.exports = {
    MONGODB:        config.MONGODB,
    DATABASE:       config.DATABASE,
    UPLOAD_PATH:    config.UPLOAD_PATH,
    FILESERVER:     config.FILESERVER,

    SINAHOST:       "https://s.weibo.com"
}