import mongoose from 'mongoose'

import Issue from './issue'
import Feed from './feed'

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
}

const models = { Issue, Feed }

export { connectDb }

export default models
