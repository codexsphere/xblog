// uuid: {type: 'string', maxlength: 36, nullable: false, validations: {isUUID: true}},
// mobiledoc: {type: 'text', maxlength: 1000000000, fieldtype: 'long', nullable: true},
// amp: {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: true},
// page: {type: 'bool', nullable: false, defaultTo: false},

module.exports = (sequelize, DataType) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataType.STRING(1000),
      allowNull: true
    },
    title: {
      type: DataType.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    meta_title: {
      type:  DataType.STRING(150),
      allowNull: true
    },
    meta_description: {
      type:  DataType.STRING(200),
      allowNull: true
    },
    slug:{
      type:  DataType.STRING(150),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    author_id: {
      type: DataType.INTEGER,
      allowNull: false
    },
    html: {
      type:  DataType.TEXT,
      allowNull: true
    },
    markdown: {
      type:  DataType.TEXT,
      allowNull: true
    },
    language: {
      type:  DataType.STRING(150),
      defaultValue: 'en'
    },
    status: {
      type:  DataType.STRING(150),
      allowNull: false,
      defaultValue: 'draft'
    },
    visibility: {
      type:  DataType.STRING(150),
      allowNull: false,
      defaultValue: 'public',
    },
    featured: {
      type:  DataType.BOOLEAN,
      defaultValue: false,
    },
    created_by: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    updated_by: {
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    published_at: {
      type: DataType.DATE,
      allowNull: true,
      defaultValue: null,
    },
    published_by: {
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  }, {
    hooks: {
      beforeCreate: post => {
        // const salt = bcrypt.genSaltSync();
        // user.password = bcrypt.hashSync(user.password, salt);
      },
    },
    classMethods: {
      associate: models => {
        Post.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    },
  });
  return Post;
};
