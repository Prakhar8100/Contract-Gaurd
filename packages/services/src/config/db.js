import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/contract-guard'
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`)
    return mongoose.connection
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
