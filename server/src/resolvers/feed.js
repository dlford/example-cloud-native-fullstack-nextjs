import { UserInputError } from 'apollo-server'

export default {
  Mutation: {
    createFeed: async (parent, { issue, message }, { models }) => {
      const issueObj = await models.Issue.find({ _id: issue }).select(
        '_id',
      )

      if (!issueObj) throw new UserInputError('Invalid issue ID')

      const feed = await models.Feed.create({
        issue,
        message,
      })
      return feed
    },
  },
}
