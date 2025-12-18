import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'guide',
  title: 'Setup Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the title (click Generate)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description for previews',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      description: 'The tool or platform this guide is for',
      options: {
        list: [
          {title: 'Raycast', value: 'raycast'},
          {title: 'Cursor', value: 'cursor'},
          {title: 'Claude Code', value: 'claude-code'},
          {title: 'ChatGPT', value: 'chatgpt'},
          {title: 'Windsurf', value: 'windsurf'},
          {title: 'Claude.ai', value: 'claude-ai'},
          {title: 'Poe', value: 'poe'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
      },
      initialValue: 'beginner',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'Estimated read time (e.g., "5 min read")',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Guide',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      platform: 'platform',
      media: 'mainImage',
    },
    prepare({title, platform, media}) {
      return {
        title,
        subtitle: platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : '',
        media,
      }
    },
  },
})
