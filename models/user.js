let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});


let User = module.exports = mongoose.model('User', userSchema);


module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser.save(callback);
      });
    });
}

module.exports.getAllUsers = (callback) => {
  User.find({}, callback);
}

module.exports.removeUser = (id, callback) => {
  User.deleteOne({_id: id}, callback);
}



module.exports.getUserByUsername = (username, callback) => {
    let query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) 
      console.log(err);
      callback(null, isMatch);
    });
}
