// import bcrypt from 'bcrypt';

module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataType.STRING(100),
      allowNull: true,
    },
    lastname: {
      type: DataType.STRING(100),
      allowNull: true,
    },
    username: {
      type: DataType.STRING,
      allowNull: true,
    },
    badlogin: {
      type: DataType.INTEGER,
      defaultValue:0
    },
    maxbadlogin: {
      type: DataType.INTEGER,
      defaultValue:5
    },
    ipaddress: {
      type: DataType.STRING,
      allowNull: true,
      defaultValue:null
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    fb_id: {
      type: DataType.STRING,
      unique: true,
      allowNull: true,
    },
    google_id: {
      type: DataType.STRING,
      unique: true,
      allowNull: true,
    },
    twitter_id: {
      type: DataType.STRING,
      unique: true,
      allowNull: true,
    },
  }, {
    hooks: {
      beforeCreate: user => {
        // const salt = bcrypt.genSaltSync();
        // user.password = bcrypt.hashSync(user.password, salt);
      },
    },
    classMethods: {
      associate: models => {
        User.hasMany(models.History);
      },
      isPassword: (encodedPassword, password) => {
        // return bcrypt.compareSync(password, encodedPassword);
        return true;
      },
    },
  });
  return User;
};
