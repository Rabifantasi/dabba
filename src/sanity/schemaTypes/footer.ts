const footerSchema = {
  name: "footer",
  type: "document",
  title: "Footer",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Footer Title",
      description: "The main heading for the footer",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "A brief description or tagline for the footer",
    },
    {
      name: "copyright",
      type: "string",
      title: "Copyright Text",
      description: "Copyright text displayed in the footer",
      initialValue: `© ${new Date().getFullYear()} Dabbe Me Dabba. All rights reserved.`,
    },
    {
      name: "backgroundColor",
      type: "string",
      title: "Background Color",
      description: "The background color of the footer",
      initialValue: "bg-red-800",
    },
    {
      name: "textColor",
      type: "string",
      title: "Text Color",
      description: "The text color of the footer",
      initialValue: "text-white",
    },
    {
      name: "padding",
      type: "string",
      title: "Padding",
      description: "Padding applied to the footer",
      initialValue: "py-8",
    },
  ],
};

// Export the variable as the default export
export default footerSchema;
