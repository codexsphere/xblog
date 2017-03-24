// id: {type: 'increments', nullable: false, primary: true},
// uuid: {type: 'string', maxlength: 36, nullable: false, validations: {isUUID: true}},
// title: {type: 'string', maxlength: 150, nullable: false},
// slug: {type: 'string', maxlength: 150, nullable: false, unique: true},
// markdown: {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: true},
// mobiledoc: {type: 'text', maxlength: 1000000000, fieldtype: 'long', nullable: true},
// html: {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: true},
// amp: {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: true},
// image: {type: 'text', maxlength: 2000, nullable: true},
// featured: {type: 'bool', nullable: false, defaultTo: false},
// page: {type: 'bool', nullable: false, defaultTo: false},
// status: {type: 'string', maxlength: 150, nullable: false, defaultTo: 'draft'},
// language: {type: 'string', maxlength: 6, nullable: false, defaultTo: 'en_US'},
// visibility: {type: 'string', maxlength: 150, nullable: false, defaultTo: 'public', validations: {isIn: [['public']]}},
// meta_title: {type: 'string', maxlength: 150, nullable: true},
// meta_description: {type: 'string', maxlength: 200, nullable: true},
// author_id: {type: 'integer', nullable: false},
// created_at: {type: 'dateTime', nullable: false},
// updated_at: {type: 'dateTime', nullable: true},
// created_by: {type: 'integer', nullable: false},
// updated_by: {type: 'integer', nullable: true},
// published_at: {type: 'dateTime', nullable: true},
// published_by: {type: 'integer', nullable: true}

module.exports = (sequelize, DataType) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataType.STRING(1000)
      nullable: true
    },
    title: {
      type: DataType.STRING(150),
      allowNull: false,
    },
    slug: {
      type:  DataType.STRING(150),
      unique: true,
      allowNull: false,
    },
    // author_id: {type: 'integer', nullable: false},
    // html: {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: true},
    // markdown: {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: true},
    // language: {type: 'string', maxlength: 6, nullable: false, defaultTo: 'en_US'},
    // status: {type: 'string', maxlength: 150, nullable: false, defaultTo: 'draft'},
    // visibility: {type: 'string', maxlength: 150, nullable: false, defaultTo: 'public', validations: {isIn: [['public']]}},

    // uuid: {type: 'string', maxlength: 36, nullable: false, validations: {isUUID: true}},
    // mobiledoc: {type: 'text', maxlength: 1000000000, fieldtype: 'long', nullable: true},
    // amp: {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: true},
    // featured: {type: 'bool', nullable: false, defaultTo: false},
    // page: {type: 'bool', nullable: false, defaultTo: false},
    // meta_title: {type: 'string', maxlength: 150, nullable: true},
    // meta_description: {type: 'string', maxlength: 200, nullable: true},
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
