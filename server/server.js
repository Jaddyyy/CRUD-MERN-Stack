const express = require ('express')
const dotenv = require ('dotenv')
const colors = require ('colors')
const dbConnection = require ('./config/dcConnection')
const userSchema = require('./models/userSchema')
const bcrypt = require ('bcrypt')
const cors = require('cors')
const jwt = require('jsonwebtoken')

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())


app.post('/register', async (req, res) => {
  const {name, email, password} = req.body
  if (!name || !email || !password){
    return res.send({Message: 'Please fill all the fields'})
  }
  const checkemail = await userSchema.findOne({email})
  if (checkemail){
    return res.send({Message: 'Email already exists'})
    }
    const hashedpass = await bcrypt.hash(password,10)
    const data = await new userSchema({name, email, password:hashedpass}).save()
    res.send({Message: 'Email registered successfully'})
} )

app.post('/login' , async(req, res) => {
  const {email, password} = req.body
  const user = await userSchema.findOne({email})
  if(!user){
    return res.send({Message: 'Email not found'})
  }
  const compared = await bcrypt.compare(password , user.password)

  if(compared){
    const tokens = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {expiresIn: "5m"} )

    return res.send({Message: 'Login successful', token: tokens})
  } else{
    return res.send({Message: 'Password is incorrect'})
  }
})

app.get('/getdata', async(req, res) =>{
  const data = await userSchema.find()
  res.send(data)
})

app.delete('/deleteuser/:id', async (req, res) => {
  const { id } = req.params;
  const deleteddata = await userSchema.findByIdAndDelete(id)

  if (deleteddata) {
      return res.status(200).send({ Message: "Deleted Successfully" })
  } else {
      return res.status(400).send({ Message: "Invalid Id" })
  }
})

app.get('/getuserbyId/:id', async (req, res) => {
  const { id } = req.params;
  const user = await userSchema.findById(id)

  if (user) {
      return res.status(200).send(user)
  } else {
      return res.status(400).send({ Message: "User Not Found" })
  }
})

app.put('/edituser/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const userdata = await userSchema.findByIdAndUpdate(id, { name, email }, { new: true })

  if (userdata) {
      return res.status(200).send({ Message: "User'information Updated" })
  } else {
      return res.status(400).send({ Message: "Invalid Information" })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  dbConnection() 
  console.log(`Server is running on port ${PORT}`.bgCyan)
})