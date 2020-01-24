import mongoose from 'mongoose'

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Issue must have a title!'],
  },
  description: {
    type: String,
  },
})

issueSchema.virtual('feed', {
  ref: 'Feed',
  localField: '_id',
  foreignField: 'issue',
  options: {
    sort: {
      timestamp: -1,
    },
  },
})

issueSchema.pre('save', function(next) {
  if (this.isNew) {
    this.model('Feed').create(
      {
        issue: this.id,
        message: 'Issue created.',
      },
      next(),
    )
  }
})

issueSchema.pre('remove', function(next) {
  this.model('Feed').deleteMany({ issue: this.id }, next)
})

const Issue = mongoose.model('Issue', issueSchema)

export default Issue
