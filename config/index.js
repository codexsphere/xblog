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
    database: 'xblog',
    username: 'looper',
    password: '1234567890',
    params: {
      dialect: 'postgres',
    logging: false,
    define: {
      underscored: true,
    },
  },
},
development : {
    host: '127.0.0.1',
    database: 'xblog',
    username: 'looper',
    password: '1234567890',
    params: {
      dialect: 'postgres',
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
   host: 'localhost',// Host name for database connection.
    port: 3306,// Port number for database connection.
    user: 'session_test',// Database user.
    password: 'password',// Password for the above database user.
    database: 'session_test',// Database name.
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
