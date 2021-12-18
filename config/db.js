const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')
// const db = 'mongodb://localhost:27017/profile'
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // (node:4298) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
      useFindAndModify: false,
    })
    console.log(`MongoDB connected!`)
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
}
module.exports = connectDB
