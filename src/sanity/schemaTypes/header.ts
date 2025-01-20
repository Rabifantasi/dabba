const headerSchema = {
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    {
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'The title of the website displayed in the header.',
    },
    {
      name: 'promotionalMessage',
      title: 'Promotional Message',
      type: 'string',
      description: 'A promotional message displayed in the top header.',
    },
    {
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'label',
            },
          },
        },
      ],
      description: 'Links to different pages in the website.',
    },
  ],
};

// Export the variable as the default export
export default headerSchema;
