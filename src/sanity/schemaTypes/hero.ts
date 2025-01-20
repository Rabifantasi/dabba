const heroSectionSchema = {
  name: "heroSection",
  type: "document",
  title: "Hero Section",
  fields: [
    {
      name: "sliderImages",
      type: "array",
      title: "Slider Images",
      of: [{ type: "image" }],
      description: "Images for the hero section slider.",
    },
    {
      name: "customizableGiftBoxes",
      type: "array",
      title: "Customizable Gift Boxes",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", type: "image", title: "Image" },
            { name: "title", type: "string", title: "Title" },
            { name: "price", type: "string", title: "Price" },
          ],
        },
      ],
    },
    {
      name: "featuredGiftBaskets",
      type: "array",
      title: "Featured Gift Baskets",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", type: "image", title: "Image" },
            { name: "title", type: "string", title: "Title" },
            { name: "price", type: "string", title: "Price" },
          ],
        },
      ],
    },
    {
      name: "customerTestimonials",
      type: "array",
      title: "Customer Testimonials",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", type: "image", title: "Image" },
            { name: "quote", type: "text", title: "Quote" },
            { name: "author", type: "string", title: "Author" },
          ],
        },
      ],
    },
    {
      name: "newArrivals",
      type: "array",
      title: "New Arrivals",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", type: "image", title: "Image" },
            { name: "title", type: "string", title: "Title" },
            { name: "price", type: "string", title: "Price" },
          ],
        },
      ],
    },
    {
      name: "eventHighlights",
      type: "array",
      title: "Event Highlights",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", type: "image", title: "Image" },
            { name: "title", type: "string", title: "Title" },
            { name: "date", type: "string", title: "Date" },
          ],
        },
      ],
    },
  ],
};

// Export the variable as the default export
export default heroSectionSchema;
