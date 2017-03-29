module.exports = (sequelize, DataType) => {
  const Errors = sequelize.define('Errors', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataType.STRING,
      defaultValue: 'bug'
    },
    type: {
      type: DataType.STRING,
      defaultValue: 'bug'
    },
    level: {
      type: DataType.INTEGER,
      defaultValue: 1
    },
  },{
    classMethods: {
      associate: models => {
        Errors.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      },
    },
  });
  return Errors;
};
