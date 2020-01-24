import mongoose from 'mongoose'

const feedSchema = new mongoose.Schema({
  issue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Issue',
    required: [true, 'Feed must have an associated issue!'],
  },
  message: {
    type: String,
    required: [true, 'Feed must have a message!'],
  },
  timestamp: {
    type: Date,
  },
})

feedSchema.pre('save', function(next) {
  if (this.isNew) {
    this.timestamp = new Date(Date.now())
  }
  next()
})

const Feed = mongoose.model('Feed', feedSchema)

export default Feed
