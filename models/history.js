// import bcrypt from 'bcrypt';

module.exports = (sequelize, DataType) => {
  const History = sequelize.define('History', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    msg: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    hooks: {
      beforeCreate: history => {
        // const salt = bcrypt.genSaltSync();
        // user.password = bcrypt.hashSync(user.password, salt);
      },
    },
    classMethods: {
      associate: models => {
        History.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      },
    },
  });
  return History;
};
