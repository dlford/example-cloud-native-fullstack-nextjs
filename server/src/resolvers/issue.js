import { UserInputError } from 'apollo-server'

export default {
  Query: {
    issues: async (parent, args, { models }) => {
      return await models.Issue.find({})
    },
    issue: async (parent, { id }, { models }) => {
      const issue = await models.Issue.findById(id).populate({
        path: 'feed',
      })

      if (!issue) throw new UserInputError('Could not find issue!')

      return issue
    },
  },

  Mutation: {
    createIssue: async (
      parent,
      { title, description },
      { models },
    ) => {
      const issue = await models.Issue.create({
        title,
        description,
      })

      return issue
    },
    removeIssue: async (parent, { id }, { models }) => {
      const issue = await models.Issue.findById(id)

      if (!issue) throw new UserInputError('Could not find issue!')

      try {
        await issue.remove()
      } catch {
        return null
      }

      return issue.id
    },
  },
}
