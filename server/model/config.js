let config = null;

switch(process.env.SCENE) {
    case 'GENERAL':
        config = require('./config/config_general');
        break;
}

module.exports = {
    MONGODB:        config.MONGODB,
    DATABASE:       config.DATABASE,
    UPLOAD_PATH:    config.UPLOAD_PATH,
    FILESERVER:     config.FILESERVER,

    SINAHOST:       config.SINAHOST,
}