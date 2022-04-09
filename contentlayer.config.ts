import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    description: { type: 'string', required: true },
    author: { type: 'string', required: true },
    avatar: { type: 'string', required: true },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, '')
    },
    wordCount: {
      type: 'number',
      resolve: (doc) => doc.body.raw.split(/\s+/gu).length
    },
    readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
})