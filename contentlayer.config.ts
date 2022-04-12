import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/*.mdx`,
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
    unlisted: {
      type: 'boolean',
      description: 'Whether or not to show on the main homepage feed'
    }
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

export const Newsletter = defineDocumentType(() => ({
  name: 'Newsletter',
  filePathPattern: `archive/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the letter',
      required: true,
    },
    description: { type: 'string', required: true },
    author: { type: 'string', required: true },
    avatar: { type: 'string', required: true },
    date: {
      type: 'date',
      description: 'The date of the letter',
      required: true,
    },
    unlisted: {
      type: 'boolean',
      description: 'Whether or not to show on the main homepage feed'
    }
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

export const Marketing = defineDocumentType(() => ({
  name: 'Marketing',
  filePathPattern: `marketing/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the letter',
      required: true,
    },
    description: { type: 'string', required: true },
    author: { type: 'string', required: true },
    avatar: { type: 'string', required: true },
    date: {
      type: 'date',
      description: 'The date of the letter',
      required: true,
    },
    unlisted: {
      type: 'boolean',
      description: 'Whether or not to show on the main homepage feed'
    }
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
  contentDirPath: 'data',
  documentTypes: [Post, Newsletter, Marketing],
})