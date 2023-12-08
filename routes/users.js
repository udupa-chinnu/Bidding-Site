var mongoose = require('mongoose');
const plm = require('passport-local-mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/newBID");

const userdata = mongoose.Schema({
  username:String,
  password:String
});

userdata.plugin(plm);
module.exports = mongoose.model("userCollections",userdata);
