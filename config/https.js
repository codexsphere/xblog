var https = require('https');
var fs = require('fs');


module.exports = app => {
  if (process.env.NODE_ENV !== 'test') {
    const credentials = {
      key: fs.readFileSync('server.key', 'utf8'),
      cert: fs.readFileSync('server.cert', 'utf8'),
    };
    app.db.sequelize.sync().done(() => {
      https.createServer(credentials, app)
        .listen(app.get('port'), () => {
          console.log(`Server - Port ${app.get('port')}`);
        });
    });
  }
};
