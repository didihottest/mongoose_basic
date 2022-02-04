const { Schema, model } = require('mongoose')
const Kucing = require('./kucing')
// modul plugin untuk validasi unique
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Nama Wajib Di Input']
  },
  age: {
    type: Number,
    min: [0, "Anda Terlalu Muda, Belajar Jalan Dulu"],
    max: [100, 'Anda Ketuaan Untuk Main Disini']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        return value.length > 6
      },
      message: props => `email ${props.value} tidak valid ! Email minimal 6 karakter`
    },
  },
  address: {
    street: String,
    city: String
  },
  hobbies: [String],
  status: {
    type: String,
    required: true,
    enum: {
      message: '{VALUE} is not supported, please input Hidup or Meninggal',
      values: ['Hidup', 'Meninggal'],
    }
  },
  is_active: {
    type: Boolean
  },
  kucing: { type: Schema.Types.ObjectId, ref: 'Kucing' }
})
UserSchema.plugin(uniqueValidator);

const User = model("User", UserSchema)

module.exports = User