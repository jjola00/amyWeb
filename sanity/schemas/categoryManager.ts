import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'categoryManager',
  title: '🚀 Setup Categories',
  type: 'document',
  icon: () => '🚀',
  fields: [
    defineField({
      name: 'title',
      title: 'Setup Tool',
      type: 'string',
      initialValue: 'Category Setup & Management',
      readOnly: true,
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'text',
      initialValue: `This is a helper tool. To set up your artwork categories:

1. Go to "Art Categories" in the sidebar
2. Create a new category for each type you need:
   - Digital Fanart
   - Digital Original Art
   - Traditional Original Art
   - Mascot
   - Commissions
   - Sketches
   - Comics

3. Once categories are created, you can select them when adding artwork!

Note: Categories are linked to your site's predefined types, so they'll show up in the gallery filters automatically.`,
      readOnly: true,
      rows: 15,
    }),
    defineField({
      name: 'status',
      title: 'Setup Status',
      type: 'string',
      options: {
        list: [
          { title: '🔄 In Progress', value: 'in-progress' },
          { title: '✅ Complete', value: 'complete' }
        ]
      },
      initialValue: 'in-progress'
    })
  ],
  preview: {
    prepare() {
      return {
        title: '🚀 Setup Categories',
        subtitle: 'Click to see instructions for setting up your artwork categories'
      }
    }
  }
})