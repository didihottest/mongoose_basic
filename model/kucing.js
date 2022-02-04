const mongoose = require('mongoose')

const kucingSchema = new mongoose.Schema({
  name: String,
  color: String,
  // user: UserSchema
});


const Kucing = mongoose.model('Kucing', kucingSchema);



module.exports = Kucing