var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var path = require('path');
var config = require('./config');
console.log(config);
var dbConfig = config.db.development;
const env = process.env.NODE_ENV;
if (env == 'production') {
  console.log(`Running in ${env} Mode.`);
  // dbConfig = config.db.production;
}

let db = null;
if (!db) {
  const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig.params
  );
  db = {
    sequelize,
    Sequelize,
    models: {},
  };
  const dir = path.join(__dirname,'models');
  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    db.models[model.name] = model;
  });
  Object.keys(db.models).forEach(key => {
    db.models[key].associate(db.models);
  });
}

module.exports = db;
