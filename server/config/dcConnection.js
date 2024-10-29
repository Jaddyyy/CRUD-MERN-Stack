const mongoose = require('mongoose')
const colors = require('colors')

const dbConnection = async () =>{
  const ConnectionString = process.env.MONGO_URI
  try {
    await mongoose.connect(ConnectionString)
      console.log('DataBase is connected'.bgMagenta)
  } catch (error){
    console.log(`Error in connection ${error}`.bgRed);
  }
}
module.exports = dbConnection