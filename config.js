var winston = require('winston');
var fs = require('fs');

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logs/app.log',
      maxsize: 1048576,
      maxFiles: 10,
      colorize: false,
    }),
  ],
});



module.exports = {
logger : logger,
db : {
production : {
    host: 'localhost',
    database: '',
    username: '',
    password: '',
    params: {
      dialect: 'mysql',
    logging: false,
    define: {
      underscored: true,
    },
  },
},
development : {
    host: process.env.DB_HOST,
    database: process.env.DB,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    params: {
      dialect: 'mysql',
      logging: (sql) => {
        logger.info(`[${new Date()}] ${sql}`);
      },
      define: {
        underscored: true,
      },
    },
  },
},
jwt : {
    secret: '$uP3rUltr@Meg@S3cR3T',
    session: { session: false }
},

sessions : {
    host: process.env.DB_HOST,
    database: process.env.DB,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    secret: '$uP3rUltr@Meg@S3cR3T',
    checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
    expiration: 86400000,// The maximum age of a valid session; milliseconds.
    createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist.
    connectionLimit: 1,// Number of connections when creating a connection pool
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}
};
