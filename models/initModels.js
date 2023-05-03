const Postimg = require('../models/postimg.model');
const Comment = require('../models/comment.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');

const initModel = () => {
  User.hasMany(Post, { foreignKey: 'userId' });
  Post.belongsTo(User, { foreignKey: 'userId' });

  User.hasMany(Comment);
  Comment.belongsTo(User);

  Post.hasMany(Comment);
  Comment.belongsTo(Post);

  Post.hasMany(Postimg);
  Postimg.belongsTo(Post);
};

module.exports = initModel;
