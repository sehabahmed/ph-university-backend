import app from './app'
import config from '../src/app/index'
import mongoose from 'mongoose'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      console.log(`This server is running on Port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
