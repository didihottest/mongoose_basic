const express = require("express")
const app = express()
const mongoose = require('mongoose');
const Kucing = require('./model/kucing')
const User = require('./model/user')

// function untuk connect ke DB Mongodb
async function main() {
  await mongoose.connect('mongodb://localhost:27017/mongoose_basic',);
}
// kalau ada error ketika connect maka log error nya
main().catch(err => console.log(err));

app.use(express.json())
// untuk create user
app.post('/user', async (req, res) => {

  try {
    const newUser = new User({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      address: {
        street: req.body.street,
        city: req.body.city
      },
      hobbies: req.body.hobbies,
      status: req.body.status,
      kucing: req.body.kucing
    })

    await newUser.save()

    res.json({
      data: newUser
    })
  } catch (error) {
    console.log(error.message);
  }

})
// untuk find user
app.post('/user/find', async (req, res) => {
  const { name, age } = req.body
  try {
    // cara 1 pakai method yang mirip dengan di mongodb asli
    const filterCondition = {}
    if (name) {
      filterCondition['name'] = name
    }
    if (age) {
      filterCondition['age'] = age
    }
    // filter pakai if
    // const users = await User.find(filterCondition)
    // get data dari collection lain (kucing) dengan method populate
    const users = await User.find(filterCondition).populate('kucing')
    // filter tidak berjalan karena filter nya selalu aktif, jadi tidak bisa find document tanpa filter
    // const users = await User.find({ name, age: { $gte: age } })


    // filter dengan sort
    // const users = await User.find(filterCondition).sort({ name: 1 })

    // filter dengan cara where di mongoose
    // const users = await User.where('age').gte(21).lte(65) 
    // const userFind = User.find()
    // if (age) {
    //   userFind.where('age').equals(age)
    // }

    // if (name) {
    //   userFind.where('name').equals(name)
    // }

    // const users = await userFind
    res.json({
      data: users
    })
  } catch (error) {
    console.log(error);
  }
})

app.put('/user/:id', async (req, res) => {
  const { id } = req.params
  const { name, age, email } = req.body
  try {
    const userToEdit = await User.findOne({ _id: id })
    if (name) {
      userToEdit.name = name
    }
    if (age) {
      userToEdit.age = age
    }
    if (email) {
      userToEdit.email = email
    }

    await userToEdit.save()

    res.json({
      message: "Success"
    })
  } catch (error) {
    res.json({
      error
    })
  }

})



app.post('/kucing', async (req, res) => {
  const kucingBaru = await Kucing.create({
    name: req.body.name
  })

  res.json({
    data: kucingBaru
  })
})

app.get('/kucing', async (req, res) => {
  const seluruhKucing = await Kucing.find()
  res.json({ seluruhKucing })
})

const PORT = 3000

app.listen(PORT, () => {
  console.log("SERVER BERJALAN DI PORT " + PORT);
})